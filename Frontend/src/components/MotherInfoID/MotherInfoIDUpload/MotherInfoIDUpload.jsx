import React, { useState } from 'react';
import MotherInfoIDUploadFront from './MotherInfoIDUploadFront';
import MotherInfoIDUploadBack from './MotherInfoIDUploadBack';

const MotherInfoIDUpload = () => {
  const [uploadedData, setUploadedData] = useState({
    front: null,
    back: null,
  });

  return (
    <div style={{ padding: '10px' }}>
      <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
        <MotherInfoIDUploadFront
          setUploadedData={(data) => setUploadedData((prev) => ({ ...prev, front: data }))}
        />
        <MotherInfoIDUploadBack
          setUploadedData={(data) => setUploadedData((prev) => ({ ...prev, back: data }))}
        />
      </div>

      {uploadedData.front && uploadedData.back && (
        <div style={{ marginTop: '10px', textAlign: 'center' }}>
          <button onClick={() => alert('Both front and back IDs uploaded!')}>Save Uploaded IDs</button>
        </div>
      )}
    </div>
  );
};

export default MotherInfoIDUpload;
