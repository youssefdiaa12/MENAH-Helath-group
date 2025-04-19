// C:\Users\yahya\Halebi\src\components\Management\Admin\NurseVerificationErrors.jsx

import React, { useEffect, useState } from 'react';

const NurseVerificationErrors = () => {
  const [verificationErrors, setVerificationErrors] = useState([]);

  useEffect(() => {
    const errors = JSON.parse(localStorage.getItem('nurseVerificationErrors')) || [];
    setVerificationErrors(errors);
  }, []);

  return (
    <div style={{ padding: '20px', border: '2px solid #ccc', borderRadius: '10px' }}>
      <h3 style={{ fontWeight: 'bold', color: '#dc3545' }}>Nurse Verification Errors</h3>

      {verificationErrors.length === 0 ? (
        <p>No verification errors found for nurses.</p>
      ) : (
        <ul style={{ listStyleType: 'none', padding: '0' }}>
          {verificationErrors.map((error, index) => (
            <li
              key={index}
              style={{
                padding: '10px',
                border: '1px solid #dc3545',
                borderRadius: '8px',
                backgroundColor: '#f9f9f9',
                marginBottom: '10px'
              }}
            >
              <strong>{error.nurseName}</strong> - {error.message}
              <br />
              <small>{error.timestamp}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NurseVerificationErrors;
