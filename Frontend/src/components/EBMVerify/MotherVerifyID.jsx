import React, { useState } from 'react';

const MotherVerifyID = () => {
  const [idMatched, setIdMatched] = useState(false);

  const handleVerifyID = () => {
    // Logic for verifying mother's personal ID.
    // This would be implemented with the ID scanning system in a real-world scenario.
    setIdMatched(true);
    alert('Mother ID verified successfully.');
  };

  return (
    <div style={{ border: '1px solid gray', padding: '10px', marginTop: '10px' }}>
      <h4>Mother Personal ID Verification</h4>

      {!idMatched && (
        <button onClick={handleVerifyID} style={{ marginBottom: '10px' }}>
          Verify Mother Personal ID
        </button>
      )}

      {idMatched && <p style={{ color: 'green' }}>✅ Mother ID matched.</p>}
    </div>
  );
};

export default MotherVerifyID;
