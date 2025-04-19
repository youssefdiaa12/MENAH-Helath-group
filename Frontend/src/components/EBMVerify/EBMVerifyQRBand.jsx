import React, { useState, useContext } from 'react';
import { BabyContext } from '../../context/BabyContext';

const EBMVerifyQRBand = () => {
  const { babyData } = useContext(BabyContext);
  const [nurse2CodeInput, setNurse2CodeInput] = useState('');
  const [awaitingVerification, setAwaitingVerification] = useState(false);
  const [matched, setMatched] = useState(false);

  const handleMatch = () => {
    const qrCodeOnBottle = localStorage.getItem('bottleQRCode');
    const qrCodeInSystem = babyData.qrCodeValue;

    if (qrCodeOnBottle && qrCodeOnBottle === qrCodeInSystem) {
      const nurse1Name = localStorage.getItem('nurseName') || 'Nurse 1';
      localStorage.setItem('pendingNurseVerification', JSON.stringify({
        babyName: babyData.babyName,
        babyMRN: babyData.babyMRN,
        method: 'QR Band Verification',
        requestedBy: nurse1Name
      }));

      alert("QR Band matched. Nurse 2 will be notified to verify.");
      setAwaitingVerification(true);
    } else {
      alert("QR Band and bottle code do not match. Please try another method.");
    }
  };

  const handleConfirmVerification = () => {
    const nurse2StoredCode = localStorage.getItem('nurseVerificationCode');

    if (nurse2CodeInput === nurse2StoredCode) {
      alert("Nurse 2 confirmed match. You may now give the milk.");
      setMatched(true);
      setAwaitingVerification(false);
      setNurse2CodeInput('');
    } else {
      alert("Verification code from Nurse 2 is incorrect.");
    }
  };

  const handleMotherFallback = () => {
    alert("Please proceed to verify the mother (Fingerprint or ID).");
  };

  return (
    <div style={{ border: '1px solid gray', padding: '10px' }}>
      <h4>QR Code Band + Bottle QR Verification</h4>

      {!awaitingVerification && !matched && (
        <button onClick={handleMatch} style={{ marginBottom: '10px' }}>
          Match QR Band with Bottle QR Code
        </button>
      )}

      {awaitingVerification && (
        <div>
          <label>Second Nurse Verification Code:</label>
          <input
            type="password"
            value={nurse2CodeInput}
            onChange={(e) => setNurse2CodeInput(e.target.value)}
            style={{ marginLeft: '10px', padding: '5px' }}
          />
          <button onClick={handleConfirmVerification} style={{ marginLeft: '10px' }}>
            Confirm
          </button>
        </div>
      )}

      {matched && <p style={{ color: 'green' }}>✅ Milk matched. Proceed to feeding.</p>}

      {!matched && !awaitingVerification && (
        <div style={{ marginTop: '10px' }}>
          <p style={{ color: 'red' }}>If not matched, proceed to another method or verify mother.</p>
          <button onClick={handleMotherFallback}>Verify Mother</button>
        </div>
      )}
    </div>
  );
};

export default EBMVerifyQRBand;
