import React, { useState, useContext } from 'react';
import { BabyContext } from '../../context/BabyContext';

const MotherInfoFingerPrintUpload = () => {
  const { babyData } = useContext(BabyContext);
  const [uploadedImage, setUploadedImage] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (!babyData.babyName || !babyData.babyMRN) {
      alert('Please enter Baby Name and MRN first.');
      return;
    }
    if (!uploadedImage) {
      alert('No uploaded fingerprint to save.');
      return;
    }

    const fileName = `Mother_Finger_Print_Upload_${babyData.babyName}_${babyData.babyMRN}.png`;
    const link = document.createElement('a');
    link.href = uploadedImage;
    link.download = fileName;
    link.click();

    alert('Uploaded fingerprint saved successfully.');
  };

  const handleRemove = () => {
    setUploadedImage(null);
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h4>Upload Mother Finger Print</h4>
      <input type="file" accept="image/*" onChange={handleFileUpload} />
      {uploadedImage && (
        <div>
          <img src={uploadedImage} alt="Uploaded Mother Finger Print" style={{ width: '100px', marginTop: '10px' }} />
          <br />
          <button onClick={handleSave} style={{ marginTop: '10px' }}>
            Save
          </button>
          <button onClick={handleRemove} style={{ marginLeft: '10px', marginTop: '10px' }}>
            Remove
          </button>
        </div>
      )}
    </div>
  );
};

export default MotherInfoFingerPrintUpload;