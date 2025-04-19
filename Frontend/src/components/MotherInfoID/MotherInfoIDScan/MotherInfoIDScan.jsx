import React, { useState } from 'react';
import MotherInfoIDScanFront from './MotherInfoIDScanFront';
import MotherInfoIDScanBack from './MotherInfoIDScanBack';

const MotherInfoIDScan = () => {
  const [capturedData, setCapturedData] = useState({
    front: null,
    back: null,
  });

  return (
    <div style={{ padding: '10px' }}>
      <p>Baby Name: {capturedData.front?.name || 'Not Entered'} | Baby MRN: {capturedData.front?.idNumber || 'Not Entered'}</p>

      <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
        <MotherInfoIDScanFront
          setCapturedData={(data) => setCapturedData((prev) => ({ ...prev, front: data }))}
        />
        <MotherInfoIDScanBack
          setCapturedData={(data) => setCapturedData((prev) => ({ ...prev, back: data }))}
        />
      </div>

      {capturedData.front && capturedData.back && (
        <div style={{ marginTop: '10px' }}>
          <button onClick={() => alert('Both front and back ID scanned!')}>
            Save ID
          </button>
        </div>
      )}
    </div>
  );
};

export default MotherInfoIDScan;
