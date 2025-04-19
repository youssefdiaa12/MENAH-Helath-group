import React, { useState } from 'react';

const MotherVerifyFingerPrint = () => {
  const [verified, setVerified] = useState(false);

  const handleVerify = () => {
    const confirmed = window.confirm("Scan mother's fingerprint. Click OK if it matches.");

    if (confirmed) {
      setVerified(true);
      alert("Mother's fingerprint verified successfully.");
    } else {
      alert("Fingerprint verification failed.");
    }
  };

  return (
    <div style={{ border: '1px solid gray', padding: '10px' }}>
      <h4>Mother Fingerprint Verification</h4>
      <button onClick={handleVerify}>Scan Fingerprint</button>
      {verified && <p style={{ color: 'green' }}>✅ Mother verified.</p>}
    </div>
  );
};

export default MotherVerifyFingerPrint;
