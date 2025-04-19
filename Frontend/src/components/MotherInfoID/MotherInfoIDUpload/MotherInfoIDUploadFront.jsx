import React, { useState, useContext } from 'react';
import { BabyContext } from "../../../context/BabyContext";

const MotherInfoIDUploadFront = () => {
  const { babyData } = useContext(BabyContext);
  const [uploadedImage, setUploadedImage] = useState(null);

  const babyName = babyData?.name?.trim();
  const babyMRN = babyData?.mrn?.trim();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const saveImage = () => {
    if (!uploadedImage) return;
    if (!babyName || !babyMRN) {
      alert("Please enter Baby Name and MRN before saving.");
      return;
    }

    const fileName = `Mother_ID_Upload_Front_${babyName}_${babyMRN}.png`;
    const link = document.createElement('a');
    link.href = uploadedImage;
    link.download = fileName;
    link.click();
  };

  const clearImage = () => {
    setUploadedImage(null);
  };

  return (
    <div style={{ width: '50%', padding: '10px', boxSizing: 'border-box', border: '1px solid lightgray' }}>
      <h3>Upload Front Side of Mother ID</h3>

      <input type="file" accept="image/*" onChange={handleFileChange} />

      {uploadedImage && (
        <div style={{ marginTop: '10px' }}>
          <img src={uploadedImage} alt="Uploaded Front ID" style={{ width: '300px', height: '200px' }} />
          <div style={{ marginTop: '10px' }}>
            <button onClick={saveImage}>Save Image</button>
            <button onClick={clearImage} style={{ marginLeft: '10px' }}>Clear</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MotherInfoIDUploadFront;
