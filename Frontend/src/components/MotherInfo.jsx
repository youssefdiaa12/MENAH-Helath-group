import React, { useState, useContext } from 'react';
import { BabyContext } from '../context/BabyContext';
import axios from 'axios';
import TitleSub from './TitleSub';

const MotherInfo = () => {
  const { babyData } = useContext(BabyContext);
  const [motherData, setMotherData] = useState({
    motherName: '',
    motherNameArabic: '',
    motherMRN: '',
    motherAge: '',
    gravida: '',
    para: '',
    abortion: '',
    deliveryType: '',
  });
  const [saved, setSaved] = useState(false);

  const translateMotherName = async (arabicName) => {
    if (!arabicName.trim()) return;
    if (!navigator.onLine) {
      alert("No internet connection. Please connect to translate.");
      return;
    }

    try {
      const response = await axios.get('https://api.mymemory.translated.net/get', {
        params: {
          q: arabicName,
          langpair: 'ar|en'
        }
      });

      const translated = response.data.responseData.translatedText;
      setMotherData((prevData) => ({
        ...prevData,
        motherName: translated,
        motherNameArabic: arabicName
      }));
    } catch (error) {
      console.error("Translation failed:", error);
      alert("Translation failed. Please try again.");
    }
  };

  const handleSave = () => {
    const requiredFields = [
      { field: motherData.motherName, label: "Mother Name" },
      { field: motherData.motherMRN, label: "Mother MRN" },
      { field: motherData.motherAge, label: "Mother Age" },
      { field: motherData.gravida, label: "Gravida" },
      { field: motherData.para, label: "Para" },
      { field: motherData.abortion, label: "Abortion" },
      { field: motherData.deliveryType, label: "Type of Delivery" }
    ];

    const missing = requiredFields.find(f => f.field === "");

    if (missing) {
      alert(`Please complete the record: ${missing.label}`);
      return;
    }

    setSaved(true);
  };

  return (
    <div>
      {/* ✅ Standardized Title with Baby Info */}
      <TitleSub
        sectionTitle="Mother Information"
        babyName={babyData.babyName}
        babyMRN={babyData.babyMRN}
        loggedInUser={localStorage.getItem('currentUsername')}
      />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ flex: 1, marginRight: '10px' }}>
          <label>Mother Name (English):</label>
          <input
            type="text"
            dir="ltr"
            style={{ width: '100%' }}
            value={motherData.motherName}
            onChange={(e) => setMotherData({ ...motherData, motherName: e.target.value })}
          />
        </div>
        <div style={{ flex: 1, marginLeft: '10px' }}>
          <label style={{ float: 'right' }}>اسم الأم (بالعربية):</label>
          <input
            type="text"
            dir="rtl"
            style={{ width: '100%' }}
            value={motherData.motherNameArabic || ''}
            onChange={(e) => setMotherData({ ...motherData, motherNameArabic: e.target.value })}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                translateMotherName(motherData.motherNameArabic);
              }
            }}
          />
        </div>
      </div>

      <div>
        <label>Mother MRN:</label>
        <input
          type="number"
          value={motherData.motherMRN}
          onChange={(e) => setMotherData({ ...motherData, motherMRN: e.target.value })}
        />
      </div>

      <div>
        <label>Mother Age:</label>
        <select
          value={motherData.motherAge}
          onChange={(e) => setMotherData({ ...motherData, motherAge: e.target.value })}
        >
          <option value="">Select Age</option>
          {Array.from({ length: 59 }, (_, i) => 12 + i).map((age) => (
            <option key={age} value={age}>{age} Years</option>
          ))}
        </select>
      </div>

      <div>
        <label>Gravida:</label>
        <select
          value={motherData.gravida}
          onChange={(e) => setMotherData({ ...motherData, gravida: e.target.value })}
        >
          <option value="">Select Gravida</option>
          {Array.from({ length: 21 }, (_, i) => i).map((num) => (
            <option key={num} value={num}>{num}</option>
          ))}
        </select>
      </div>

      <div>
        <label>Para:</label>
        <select
          value={motherData.para}
          onChange={(e) => setMotherData({ ...motherData, para: e.target.value })}
        >
          <option value="">Select Para</option>
          {Array.from({ length: 21 }, (_, i) => i).map((num) => (
            <option key={num} value={num}>{num}</option>
          ))}
        </select>
      </div>

      <div>
        <label>Abortion:</label>
        <select
          value={motherData.abortion}
          onChange={(e) => setMotherData({ ...motherData, abortion: e.target.value })}
        >
          <option value="">Select Abortion</option>
          {Array.from({ length: 11 }, (_, i) => i).map((num) => (
            <option key={num} value={num}>{num}</option>
          ))}
        </select>
      </div>

      <div>
        <label>Type of Delivery:</label>
        <select
          value={motherData.deliveryType}
          onChange={(e) => setMotherData({ ...motherData, deliveryType: e.target.value })}
        >
          <option value="">Select Delivery Type</option>
          <option value="NVD">Normal Vaginal Delivery (NVD)</option>
          <option value="AVD">Assisted Vaginal Delivery (AVD)</option>
          <option value="Emergency C-Section">Emergency C-Section</option>
          <option value="Elective C-Section">Elective C-Section</option>
        </select>
      </div>

      <button onClick={handleSave}>Save Record</button>
      {saved && <p style={{ color: 'green' }}>Successfully Saved</p>}
    </div>
  );
};

export default MotherInfo;
