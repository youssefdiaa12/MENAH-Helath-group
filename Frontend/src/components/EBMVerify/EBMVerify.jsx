import React, { useState } from 'react';
import EBMUseVerifyFace from './EBMVerifyFace';
import EBMUseVerifyFoot from './EBMVerifyFoot';
import EBMUseVerifyRetina from './EBMVerifyRetina';
import EBMUseVerifyQRBand from './EBMVerifyQRBand';
import MotherVerifyFingerPrint from './MotherVerifyFingerPrint';
import MotherVerifyID from './MotherVerifyID';

const EBMVerify = () => {
  const [showVerificationOptions, setShowVerificationOptions] = useState(false);
  const [fallbackVerification, setFallbackVerification] = useState(false);

  const handleFallbackVerification = () => {
    setFallbackVerification(true);
  };

  return (
    <div style={{ border: '1px solid gray', padding: '10px', marginBottom: '10px' }}>
      <div style={{ marginBottom: '10px' }}>
        <button onClick={() => setShowVerificationOptions(!showVerificationOptions)}>
          Verify the Milk
        </button>
      </div>

      {showVerificationOptions && !fallbackVerification && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <EBMUseVerifyQRBand />
          <EBMUseVerifyFoot />
          <EBMUseVerifyFace />
          <EBMUseVerifyRetina />
        </div>
      )}

      {fallbackVerification && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <MotherVerifyFingerPrint />
          <MotherVerifyID />
        </div>
      )}

      {!fallbackVerification && (
        <div style={{ marginTop: '10px' }}>
          <p style={{ color: 'red' }}>
            If none of the above matched, you can proceed to Mother Fingerprint or Personal ID.
          </p>
          <button onClick={handleFallbackVerification}>
            Verify Mother (Fingerprint or Personal ID)
          </button>
        </div>
      )}
    </div>
  );
};

export default EBMVerify;
