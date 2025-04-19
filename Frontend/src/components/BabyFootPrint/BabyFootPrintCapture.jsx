import React, { useState, useRef, useEffect, useContext } from 'react';
import { BabyContext } from '../../context/BabyContext';
import cv from '@techstark/opencv-js';

const BabyFootPrintCapture = () => {
  const { babyData } = useContext(BabyContext);
  const [capturing, setCapturing] = useState(false);
  const [image, setImage] = useState(null);
  const videoRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [opencvLoaded, setOpencvLoaded] = useState(false);

  useEffect(() => {
    const checkOpenCV = setInterval(() => {
      if (window.cv && window.cv.imread) {
        setOpencvLoaded(true);
        console.log("OpenCV Loaded Successfully!");
        clearInterval(checkOpenCV);
      }
    }, 500);
    return () => clearInterval(checkOpenCV);
  }, []);

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

  const detectFootprint = (canvas) => {
    if (!opencvLoaded) {
      alert("OpenCV is still loading. Please wait...");
      return false;
    }

    let src = cv.imread(canvas);
    let gray = new cv.Mat();
    let edges = new cv.Mat();

    cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY, 0);
    cv.Canny(gray, edges, 50, 150);

    let contours = new cv.MatVector();
    let hierarchy = new cv.Mat();
    cv.findContours(edges, contours, hierarchy, cv.RETR_EXTERNAL, cv.CHAIN_APPROX_SIMPLE);

    let footprintDetected = contours.size() > 0;

    src.delete();
    gray.delete();
    edges.delete();
    hierarchy.delete();
    contours.delete();

    return footprintDetected;
  };

  const capturePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement("canvas");
      const scale = 0.1;
      canvas.width = videoRef.current.videoWidth * scale;
      canvas.height = videoRef.current.videoHeight * scale;
      const context = canvas.getContext("2d");
      context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

      if (!detectFootprint(canvas)) {
        alert("No footprint detected! Please try again.");
        return;
      }

      setImage(canvas.toDataURL("image/png"));
    }
  };

  const handleSave = () => {
    if (!babyData.babyName || !babyData.babyMRN) {
      alert('Please enter Baby Name and MRN first');
      return;
    }
    if (!image) {
      alert('No captured footprint to save.');
      return;
    }

    const fileName = `Foot_Print_Capture_${babyData.babyName}_${babyData.babyMRN}.png`;
    const link = document.createElement('a');
    link.href = image;
    link.download = fileName;
    link.click();

    alert('Footprint saved successfully.');
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
  <video
    ref={videoRef}
    autoPlay
    playsInline
    style={{ width: '230%', maxWidth: '230px' }}
  />
</div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '10px' }}>
            <button onClick={capturePhoto}>Capture</button>
            <button onClick={handleSave}>Save</button>
            <button onClick={stopCamera}>Close</button>
          </div>
          {image && <img src={image} alt="Captured Footprint" style={{ width: '10%' }} />}
        </div>
      )}
    </div>
  );
};

export default BabyFootPrintCapture;