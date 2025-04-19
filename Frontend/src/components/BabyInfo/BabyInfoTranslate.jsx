import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BabyInfoTranslate = ({ localData, setLocalData }) => {
  const [warning, setWarning] = useState("");

  useEffect(() => {
    if (warning) {
      const timer = setTimeout(() => setWarning(""), 4000);
      return () => clearTimeout(timer);
    }
  }, [warning]);

  const handleArabicTranslation = async (arabicName) => {
    if (!arabicName.trim()) return;

    let prefix = "";
    let baseName = arabicName;

    if (arabicName.startsWith("ولد")) {
      prefix = "Baby Boy ";
      baseName = arabicName.replace(/^ولد/, '').trim();
    } else if (arabicName.startsWith("أبن") || arabicName.startsWith("ابن")) {
      prefix = "Baby Boy ";
      baseName = arabicName.replace(/^أبن|^ابن/, '').trim();
    } else if (arabicName.startsWith("بنت")) {
      prefix = "Baby Girl ";
      baseName = arabicName.replace(/^بنت/, '').trim();
    } else {
      setWarning("الرجاء البدء بـ 'ولد' أو 'ابن' أو 'بنت' قبل اسم الأم للترجمة الصحيحة.");
      return;
    }

    try {
      const response = await axios.get('https://api.mymemory.translated.net/get', {
        params: { q: baseName, langpair: 'ar|en' }
      });

      const translated = response.data.responseData.translatedText;
      setLocalData({
        ...localData,
        babyName: (prefix + translated).trim(),
        babyNameArabic: arabicName
      });
    } catch (error) {
      alert("Translation failed.");
    }
  };

  const handleEnglishTranslation = async (englishName) => {
    if (!englishName.trim()) return;

    if (!englishName.toLowerCase().startsWith("baby boy") && !englishName.toLowerCase().startsWith("baby girl")) {
      setWarning("Please start the name with 'Baby Boy' or 'Baby Girl' before the mother's name.");
      return;
    }

    const prefix = englishName.toLowerCase().startsWith("baby boy") ? "ابن" : "بنت";
    const nameOnly = englishName.replace(/^(Baby Boy|Baby Girl)/i, '').trim();

    try {
      const response = await axios.get('https://api.mymemory.translated.net/get', {
        params: { q: nameOnly, langpair: 'en|ar' }
      });

      const translated = response.data.responseData.translatedText;
      setLocalData({
        ...localData,
        babyName: englishName,
        babyNameArabic: `${prefix} ${translated}`.trim()
      });
    } catch (error) {
      alert("Translation failed.");
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div style={{ flex: 1, marginRight: '10px' }}>
        <label>Baby Name (English):</label>
        <input
          type="text"
          dir="ltr"
          style={{ width: '100%' }}
          value={localData.babyName || ""}
          onChange={(e) => setLocalData({ ...localData, babyName: e.target.value })}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleEnglishTranslation(localData.babyName);
            }
          }}
        />
      </div>

      <div style={{ flex: 1, marginLeft: '10px' }}>
        <label style={{ float: 'right' }}>اسم الطفل (بالعربية):</label>
        <input
          type="text"
          dir="rtl"
          style={{ width: '100%' }}
          value={localData.babyNameArabic || ""}
          onChange={(e) => setLocalData({ ...localData, babyNameArabic: e.target.value })}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleArabicTranslation(localData.babyNameArabic);
            }
          }}
        />
        <p style={{ fontSize: '12px', color: '#888', textAlign: 'right' }}>
          اضغط زر الإدخال (Enter) بعد كتابة الاسم للترجمة
        </p>
      </div>

      {warning && (
        <div style={{ color: 'red', fontSize: '12px', width: '100%', marginTop: '10px', textAlign: 'center' }}>
          {warning}
        </div>
      )}
    </div>
  );
};

export default BabyInfoTranslate;