import React, { useState } from 'react';
import TitleSub from '../TitleSub';
import BabyRetinaPrintCapture from './BabyRetinaPrintCapture';
import BabyRetinaPrintScan from './BabyRetinaPrintScan';
import BabyRetinaPrintUpload from './BabyRetinaPrintUpload';
import BabyRetinaPrintHelp from './BabyRetinaPrintHelp';

const BabyRetinaPrint = ({ babyName, babyMRN, loggedInUser }) => {
  const [showHelp, setShowHelp] = useState(false);

  return (
    <div style={{ padding: '10px', marginBottom: '10px', position: 'relative' }}>
      <TitleSub
        sectionTitle="Baby Retina Print"
        babyName={babyName}
        babyMRN={babyMRN}
        loggedInUser={loggedInUser}
      />

      {/* Capture Section */}
      <div>
        <BabyRetinaPrintCapture babyName={babyName} babyMRN={babyMRN} />
      </div>

      {/* Scan Section */}
      <div>
        <BabyRetinaPrintScan babyName={babyName} babyMRN={babyMRN} />
      </div>

      {/* Upload Section */}
      <div>
        <BabyRetinaPrintUpload babyName={babyName} babyMRN={babyMRN} />
      </div>

      {/* Help Button - bottom right */}
      <div style={{ position: 'absolute', bottom: '10px', right: '10px' }}>
        <button
          onClick={() => setShowHelp(true)}
          style={{
            backgroundColor: 'blue',
            color: 'white',
            border: 'none',
            padding: '10px 15px',
            cursor: 'pointer',
            borderRadius: '5px'
          }}
        >
          Help
        </button>
      </div>

      {/* Help Popup */}
      {showHelp && <BabyRetinaPrintHelp onClose={() => setShowHelp(false)} />}
    </div>
  );
};

export default BabyRetinaPrint;
