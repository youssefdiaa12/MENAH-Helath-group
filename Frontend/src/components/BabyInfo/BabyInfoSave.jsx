import React, { useContext, useState } from 'react';
import axios from 'axios';
import { BabyContext } from '../../context/BabyContext';

const BabyInfoSave = () => {
  const { babyData, updateBabyData } = useContext(BabyContext);
  const [saved, setSaved] = useState(false);

  const calculateDOL = () => {
    if (!babyData.dob) return '';
    const dobDate = new Date(babyData.dob);
    const currentDateObj = new Date();
    const differenceInTime = currentDateObj - dobDate;
    const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));
    return differenceInDays >= 0 ? `${differenceInDays} Days` : 'Invalid Date';
  };

  const calculateCGA = () => {
    if (!babyData.dob || !babyData.gaWeeks || !babyData.gaDays) return '';
    const dol = parseInt(calculateDOL().split(' ')[0], 10);
    if (isNaN(dol)) return '';
    const totalWeeks = babyData.gaWeeks + Math.floor(dol / 7);
    const totalDays = (babyData.gaDays + (dol % 7)) % 7;
    return `${totalWeeks} Weeks ${totalDays} Days`;
  };

  const handleSave = async () => {
    const requiredFields = [
      { field: "babyName", label: "Baby Name" },
      { field: "babyMRN", label: "Baby MRN" },
      { field: "visitNumber", label: "Visit Number" },
      { field: "gender", label: "Gender" },
      { field: "birthWeight", label: "Birth Weight" },
      { field: "dob", label: "Date of Birth (DOB)" },
      { field: "gaWeeks", label: "Gestational Age Weeks" },
      { field: "gaDays", label: "Gestational Age Days" }
    ];

    const emptyField = requiredFields.find(({ field }) => !babyData[field]);

    if (emptyField) {
      alert(`Please complete the record: ${emptyField.label}`);
      return;
    }

    const updatedData = {
      ...babyData,
      dol: calculateDOL(),
      cga: calculateCGA()
    };

    try {
      const response = await axios.post("http://localhost:5000/api/babies", updatedData);
      updateBabyData(response.data);
      setSaved(true);
      alert("Record saved to backend successfully!");

      // 👇 Clear the form after saving
      updateBabyData({
        babyName: "",
        babyNameArabic: "",
        babyMRN: "",
        visitNumber: "",
        gender: "",
        birthWeight: "",
        dob: "",
        gaWeeks: 0,
        gaDays: 0,
        passportId: "",
        personalId: "",
        birthCertificateId: ""
      });

    } catch (error) {
      console.error("Save failed:", error);
      alert("Failed to save to backend.");
    }
  };

  return (
    <div>
      <button onClick={handleSave}>Save Record</button>
      {saved && <p style={{ color: 'green' }}>Successfully Saved</p>}
    </div>
  );
};

export default BabyInfoSave;
