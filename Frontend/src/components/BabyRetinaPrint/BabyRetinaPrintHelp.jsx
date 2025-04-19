import React from 'react';

const BabyRetinaPrintHelp = ({ onClose }) => {
  return (
    <div style={{
      position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
      backgroundColor: 'white', padding: '20px', border: '1px solid black', zIndex: 1000
    }}>
      <h3>Retina Print Capture Guide</h3>
      <p>Capturing a baby's retina print requires specialized retina scanners. Regular cameras may not provide the required accuracy.</p>
      <p>If using a retina scanner, ensure proper eye alignment, minimal light reflection, and baby stability during scanning.</p>
      <p>Camera-based attempts may fail due to involuntary eye movement. If scanning is unsuccessful, consult a specialist for assistance.</p>
      <p>As this system logs all captures, ensure that the correct baby’s retina print is recorded to avoid misidentification.</p>
      <button onClick={onClose} style={{ marginTop: '10px', padding: '5px 10px' }}>Close</button>
    </div>
  );
};

export default BabyRetinaPrintHelp;