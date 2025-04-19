import cv from '@techstark/opencv-js';
import React, { useState, useRef, useEffect, useContext } from 'react';
import { BabyContext } from '../../context/BabyContext';

const BabyRetinaPrintScan = () => {
  const { babyData } = useContext(BabyContext);
  const [scanning, setScanning] = useState(false);
  const [image, setImage] = useState(null);
  const [opencvLoaded, setOpencvLoaded] = useState(false);
  const videoRef = useRef(null);
  const [stream, setStream] = useState(null);

  useEffect(() => {
    const checkOpenCV = setInterval(() => {
      if (window.cv) {
        setOpencvLoaded(true);
        clearInterval(checkOpenCV);
      }
    }, 100);
    return () => clearInterval(checkOpenCV);
  }, []);

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

  const capturePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement("canvas");
      const scale = 0.1;
      canvas.width = videoRef.current.videoWidth * scale;
      canvas.height = videoRef.current.videoHeight * scale;
      const context = canvas.getContext("2d");
      context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

      if (!detectRetinaPrint(canvas)) {
        alert("No retina print detected! Scan will not proceed.");
        console.log("Scan prevented: No retina print detected.");
        return;
      } else {
        console.log("Scan allowed: Retina print detected.");
      }

      setImage(canvas.toDataURL("image/png"));
    }
  };

  const detectRetinaPrint = (canvas) => {
    if (!opencvLoaded) {
      alert("OpenCV is still loading. Please wait...");
      return false;
    }

    console.log("OpenCV Loaded. Attempting to process the image.");
    let src = cv.imread(canvas);
    console.log("Image read successfully from canvas.");
    let gray = new cv.Mat();
    console.log("Gray matrix created.");
    let edges = new cv.Mat();
    console.log("Edges matrix created.");
    cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY, 0);
    console.log("Image converted to grayscale.");
    cv.Canny(gray, edges, 50, 150);
    console.log("Edge detection applied.");
    let contours = new cv.MatVector();
    let hierarchy = new cv.Mat();
    console.log("Contours and hierarchy matrices created.");
    cv.findContours(edges, contours, hierarchy, cv.RETR_EXTERNAL, cv.CHAIN_APPROX_SIMPLE);
    console.log("Contours detected:", contours.size());

    let validContours = 0;
    for (let i = 0; i < contours.size(); i++) {
      let contour = contours.get(i);
      let area = cv.contourArea(contour);
      console.log(`Contour ${i} Area:, area`);

      let boundingRect = cv.boundingRect(contours.get(i));
      let aspectRatio = boundingRect.width / boundingRect.height;
      console.log(`Contour ${i} Aspect Ratio: ${aspectRatio}`);

      let hull = new cv.Mat();
      cv.convexHull(contours.get(i), hull, false, true);
      let defects = new cv.Mat();
      cv.convexityDefects(contours.get(i), hull, defects);
      console.log(`Contour ${i} Convexity Defects: ${defects.rows}`);
      hull.delete();
      defects.delete();

      if (area > 5000 && area < 50000) {
        validContours++;
      }
    }

    if (validContours > 0) {
      console.log("Valid retina print detected!");
      return true;
    } else {
      console.log("No valid retina print detected.");
      return false;
    }
  };

  const handleSave = () => {
    if (!babyData.babyName || !babyData.babyMRN) {
      alert('Please enter Baby Name and MRN first');
      return;
    }
    if (!image) {
      alert('No captured retina print to save.');
      return;
    }

    const fileName = `Retina_Print_Scan_${babyData.babyName}_${babyData.babyMRN}.png`;
    const link = document.createElement('a');
    link.href = image;
    link.download = fileName;
    link.click();

    alert('Retina print saved successfully.');
  };

  return (
    <div>
      {!scanning && (
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
          <button onClick={() => setScanning(true)}>Open Scan</button>
        </div>
      )}
      {scanning && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <video ref={videoRef} autoPlay playsInline style={{ width: '230%', maxWidth: '230px' }} />
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '10px' }}>
            <button onClick={capturePhoto}>Scan</button>
            <button onClick={handleSave}>Save</button>
            <button onClick={stopCamera}>Stop Scanner</button>
          </div>

          {image && <img src={image} alt="Captured Retina Print" style={{ width: '10%' }} />}
        </div>
      )}
    </div>
  );
};

export default BabyRetinaPrintScan;