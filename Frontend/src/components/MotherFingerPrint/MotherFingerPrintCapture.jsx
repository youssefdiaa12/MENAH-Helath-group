import React, { useState, useRef, useEffect, useContext } from 'react';
import { BabyContext } from '../../context/BabyContext';

const MotherInfoFingerPrintCapture = () => {
  const { babyData } = useContext(BabyContext);
  const [capturing, setCapturing] = useState(false);
  const [image, setImage] = useState(null);
  const videoRef = useRef(null);
  const [stream, setStream] = useState(null);

  useEffect(() => {
    if (capturing) {
      startCamera();
    } else {
      stopCamera();
    }
  }, [capturing]);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
    setStream(null);
    setCapturing(false);
  };

  const capturePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement("canvas");
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const context = canvas.getContext("2d");
      context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

      setImage(canvas.toDataURL("image/png"));
    }
  };

  const handleSave = () => {
    if (!babyData.babyName || !babyData.babyMRN) {
      alert('Please enter Baby Name and MRN first');
      return;
    }
    if (!image) {
      alert('No captured fingerprint to save.');
      return;
    }

    const fileName = `Mother_Finger_Print_Capture_${babyData.babyName}_${babyData.babyMRN}.png`;
    const link = document.createElement('a');
    link.href = image;
    link.download = fileName;
    link.click();

    alert('Fingerprint saved successfully.');
  };

  return (
    <div>
      {!capturing && (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button onClick={() => setCapturing(true)}>Open Camera</button>
        </div>
      )}
      {capturing && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <video ref={videoRef} autoPlay playsInline style={{ width: '230px', maxWidth: '100%' }} />
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '10px' }}>
            <button onClick={capturePhoto}>Capture</button>
            <button onClick={handleSave}>Save</button>
            <button onClick={stopCamera}>Close</button>
          </div>

          {image && <img src={image} alt="Captured Mother Fingerprint" style={{ width: '100px', marginTop: '10px' }} />}
        </div>
      )}
    </div>
  );
};

export default MotherInfoFingerPrintCapture;