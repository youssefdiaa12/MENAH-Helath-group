import React, { useState, useRef, useEffect, useContext } from 'react';
import { BabyContext } from '../../context/BabyContext';

const MotherInfoFingerPrintScan = () => {
  const { babyData } = useContext(BabyContext);
  const [scanning, setScanning] = useState(false);
  const [image, setImage] = useState(null);
  const videoRef = useRef(null);
  const [stream, setStream] = useState(null);

  useEffect(() => {
    if (scanning) {
      startCamera();
    } else {
      stopCamera();
    }
  }, [scanning]);

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
    setScanning(false);
  };

  const captureScan = () => {
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
      alert('No scanned fingerprint to save.');
      return;
    }

    const fileName = `Mother_Finger_Print_Scan_${babyData.babyName}_${babyData.babyMRN}.png`;
    const link = document.createElement('a');
    link.href = image;
    link.download = fileName;
    link.click();

    alert('Scanned fingerprint saved successfully.');
  };

  return (
    <div>
      {!scanning && (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button onClick={() => setScanning(true)}>Open Scanner</button>
        </div>
      )}
      {scanning && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <video ref={videoRef} autoPlay playsInline style={{ width: '230px', maxWidth: '100%' }} />
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '10px' }}>
            <button onClick={captureScan}>Scan</button>
            <button onClick={handleSave}>Save</button>
            <button onClick={stopCamera}>Stop Scanner</button>
          </div>

          {image && <img src={image} alt="Scanned Mother Fingerprint" style={{ width: '100px', marginTop: '10px' }} />}
        </div>
      )}
    </div>
  );
};

export default MotherInfoFingerPrintScan;