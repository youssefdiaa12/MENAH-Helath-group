import React, { useState, useContext } from 'react';
import { BabyContext } from '../../context/BabyContext';
import TitleSub from '../TitleSub';
import MotherFingerPrintCapture from './MotherFingerPrintCapture';
import MotherFingerPrintScan from './MotherFingerPrintScan';
import MotherFingerPrintUpload from './MotherFingerPrintUpload';
import MotherFingerPrintHelp from './MotherFingerPrintHelp';

const MotherFingerPrint = () => {
  const { babyData } = useContext(BabyContext);
  const [showHelp, setShowHelp] = useState(false);

  return (
    <div style={{ padding: '10px', marginBottom: '10px', position: 'relative' }}>
      <TitleSub
        sectionTitle="Mother Finger Print"
        babyName={babyData?.babyName}
        babyMRN={babyData?.babyMRN}
        loggedInUser={localStorage.getItem('currentUsername')}
      />

      <div>
        <MotherFingerPrintCapture />
      </div>

      <div>
        <MotherFingerPrintScan />
      </div>

      <div>
        <MotherFingerPrintUpload />
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

      {showHelp && <MotherFingerPrintHelp onClose={() => setShowHelp(false)} />}
    </div>
  );
};

export default MotherFingerPrint;
