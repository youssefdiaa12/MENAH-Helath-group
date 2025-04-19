import React, { useState } from 'react';
import EBMHealthTipEnglish from './EBMHealthTipEnglish';
import EBMHealthTipArabic from './EBMHealthTipArabic';

const MessageTipDisplay = () => {
  const [language, setLanguage] = useState('english');

  return (
    <div style={{ border: '2px solid #ccc', padding: '15px', margin: '20px' }}>
      <div style={{ textAlign: 'right', marginBottom: '10px' }}>
        <button onClick={() => setLanguage('english')} style={{ marginRight: '10px' }}>
          English
        </button>
        <button onClick={() => setLanguage('arabic')}>Arabic</button>
      </div>

      {language === 'english' ? <EBMHealthTipEnglish /> : <EBMHealthTipArabic />}
    </div>
  );
};

export default MessageTipDisplay;