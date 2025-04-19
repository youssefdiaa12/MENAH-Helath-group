import React, { useState } from 'react';
import TitleSub from '../TitleSub';
import BabyFootPrintCapture from './BabyFootPrintCapture';
import BabyFootPrintScan from './BabyFootPrintScan';
import BabyFootPrintUpload from './BabyFootPrintUpload';
import BabyFootPrintHelp from './BabyFootPrintHelp';

const BabyFootPrint = ({ babyName, babyMRN, loggedInUser }) => {
  const [showHelp, setShowHelp] = useState(false);

  return (
    <div style={{ padding: '10px', marginBottom: '10px', position: 'relative' }}>
      <TitleSub sectionTitle="Baby Foot Print" babyName={babyName} babyMRN={babyMRN} loggedInUser={loggedInUser} />

      <div>
        <BabyFootPrintCapture babyName={babyName} babyMRN={babyMRN} />
      </div>

      <div>
        <BabyFootPrintScan babyName={babyName} babyMRN={babyMRN} />
      </div>

      <div>
        <BabyFootPrintUpload babyName={babyName} babyMRN={babyMRN} />
      </div>

      {/* Help Button - bottom right inside this component */}
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

      {showHelp && <BabyFootPrintHelp onClose={() => setShowHelp(false)} />}
    </div>
  );
};

export default BabyFootPrint;
