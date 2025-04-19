import React, { useState, useContext } from 'react';
import { BabyContext } from '../../context/BabyContext';

const EBMVerifyFoot = () => {
  const { babyData } = useContext(BabyContext);
  const [nurse2CodeInput, setNurse2CodeInput] = useState('');
  const [awaitingVerification, setAwaitingVerification] = useState(false);
  const [matched, setMatched] = useState(false);
  const [fallbackStep, setFallbackStep] = useState(false);
  const [motherVerified, setMotherVerified] = useState(false);

  const handleMatch = () => {
    const qrCodeOnBottle = localStorage.getItem('bottleQRCode');
    const qrCodeInSystem = babyData.qrCodeValue;

    if (qrCodeOnBottle && qrCodeOnBottle === qrCodeInSystem) {
      const nurse1Name = localStorage.getItem('nurseName') || 'Nurse 1';
      localStorage.setItem('pendingNurseVerification', JSON.stringify({
        babyName: babyData.babyName,
        babyMRN: babyData.babyMRN,
        method: 'FootPrint Verification',
        requestedBy: nurse1Name,
      }));

      alert("Footprint matched. Nurse 2 will be notified to verify.");
      setAwaitingVerification(true);
    } else {
      alert("Footprint and QR code do not match. Please try another method.");
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
      alert("Verification code from Nurse 2 is incorrect. Please proceed to mother verification.");
      setAwaitingVerification(false);
      setFallbackStep(true);
    }
  };

  const handleMotherFallback = () => {
    const motherVerified = window.confirm("Scan mother’s fingerprint or ID. If it matches, click OK. If not, click Cancel.");

    if (motherVerified) {
      alert("Mother verified. Please reprint a new QR code and try verification again.");
      setFallbackStep(false);
    } else {
      alert("Milk does not belong to this baby.");
    }
  };

  return (
    <div style={{ border: '1px solid gray', padding: '10px' }}>
      <h4>FootPrint + QR Code Verification</h4>

      {!awaitingVerification && !matched && !fallbackStep && (
        <button onClick={handleMatch} style={{ marginBottom: '10px' }}>
          Match FootPrint with QR Code
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

      {fallbackStep && (
        <div style={{ marginTop: '10px' }}>
          <p style={{ color: 'red' }}>
            ❗ Milk could not be verified. Please verify the mother using fingerprint or ID.
          </p>
          <button onClick={handleMotherFallback}>Verify Mother</button>
        </div>
      )}
    </div>
  );
};

export default EBMVerifyFoot;
