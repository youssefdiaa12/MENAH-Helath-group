import React from 'react';

const MotherInfoFingerPrintHelp = ({ onClose }) => {
  return (
    <div style={{
      position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
      backgroundColor: 'white', padding: '20px', border: '1px solid black', zIndex: 1000
    }}>
      <h3>Mother Finger Print Guide</h3>
      <p>Mother fingerprint data can be captured using a mobile camera. Place the finger flat and steady over the camera lens in a well-lit area. Ensure the entire fingerprint ridge is visible and avoid movement during capture for a clear image.</p>
      <p>Alternatively, dedicated fingerprint scanners can be used. Connect the scanner to your device and follow the manufacturer's instructions to register the mother’s biometric fingerprint directly into the system with higher accuracy.</p>
      <p>You may also upload a pre-scanned image of the mother’s fingerprint. Ensure the image is clear and uncropped, with proper contrast and resolution. Blurry or shadowed images may be rejected by the system.</p>
      <p>Fingerprints are legal biometric identifiers and must be captured and stored with consent. Improper handling, sharing, or use without documentation may have ethical and legal implications. Always verify identity before linking fingerprint to a baby's record.</p>
      <button onClick={onClose} style={{ marginTop: '10px', padding: '5px 10px' }}>Close</button>
    </div>
  );
};

export default MotherInfoFingerPrintHelp;