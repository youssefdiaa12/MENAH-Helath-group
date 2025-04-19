import React, { useState } from 'react';
import MotherInfoIDCaptureFront from './MotherInfoIDCaptureFront';
import MotherInfoIDCaptureBack from './MotherInfoIDCaptureBack';

const MotherInfoIDCapture = () => {
  const [capturedData, setCapturedData] = useState({
    front: null,
    back: null,
  });

  return (
    <div style={{ padding: '10px' }}>
      <p>Baby Name: {capturedData.front?.name || 'Not Entered'} | Baby MRN: {capturedData.front?.idNumber || 'Not Entered'}</p>

      <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
        <MotherInfoIDCaptureFront
          setCapturedData={(data) => setCapturedData((prev) => ({ ...prev, front: data }))}
        />
        <MotherInfoIDCaptureBack
          setCapturedData={(data) => setCapturedData((prev) => ({ ...prev, back: data }))}
        />
      </div>

      {capturedData.front && capturedData.back && (
        <div style={{ marginTop: '10px' }}>
          <button onClick={() => alert('Both front and back ID captured!')}>
            Save ID
          </button>
        </div>
      )}
    </div>
  );
};

export default MotherInfoIDCapture;
