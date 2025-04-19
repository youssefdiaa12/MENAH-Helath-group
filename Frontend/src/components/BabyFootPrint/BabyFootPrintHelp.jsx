import React from 'react';

const BabyFootPrintHelp = ({ onClose }) => {
  return (
    <div style={{
      position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
      backgroundColor: 'white', padding: '20px', border: '2px solid black', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
      width: '50%', zIndex: 1000
    }}>
      <h3 style={{ textAlign: 'center', fontWeight: 'bold' }}>Baby Foot Print Help</h3>

      <p><strong>1. Capturing Foot Print:</strong> To capture the footprint using a camera, ensure proper lighting, maintain an appropriate distance, and keep the foot at the right angle for clear visibility.</p>

      <p><strong>2. Scanning Foot Print:</strong> When using a scanner, ensure that the baby's foot is clean and placed firmly on the scanning surface for an accurate image.</p>

      <p><strong>3. Uploading Foot Print:</strong> If uploading an image, make sure the foot print is clear, well-lit, and correctly framed to be processed effectively.</p>

      <p><strong>4. Legal & Accountability:</strong> This system logs all entries. Please ensure that the footprint captured, scanned, or uploaded belongs to the correct baby. Misuse may have legal consequences.</p>

      <button
        onClick={onClose}
        style={{
          display: 'block', margin: '20px auto 0', padding: '10px 15px', backgroundColor: 'red',
          color: 'white', border: 'none', cursor: 'pointer'
        }}
      >
        Close
      </button>
    </div>
  );
};

export default BabyFootPrintHelp;