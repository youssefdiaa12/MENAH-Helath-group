import React, { useState, useRef, useEffect, useContext } from 'react';
import Tesseract from 'tesseract.js';
import { BabyContext } from "../../../context/BabyContext";

const MotherInfoIDScanBack = () => {
  const { babyData } = useContext(BabyContext);
  const [capturing, setCapturing] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [ocrText, setOcrText] = useState('');
  const [idConfirmed, setIdConfirmed] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
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

  const captureImage = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (video && canvas) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const fullImage = canvas.toDataURL('image/png');
      setCapturedImage(fullImage);

      const cropWidth = canvas.width * 0.5;
      const cropHeight = canvas.height * 0.5;
      const cropX = (canvas.width - cropWidth) / 2;
      const cropY = (canvas.height - cropHeight) / 2;

      const cropCanvas = document.createElement('canvas');
      cropCanvas.width = cropWidth;
      cropCanvas.height = cropHeight;
      const cropCtx = cropCanvas.getContext('2d');
      cropCtx.drawImage(canvas, cropX, cropY, cropWidth, cropHeight, 0, 0, cropWidth, cropHeight);

      const imageData = cropCtx.getImageData(0, 0, cropWidth, cropHeight);
      const data = imageData.data;
      for (let i = 0; i < data.length; i += 4) {
        const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
        const contrast = avg > 127 ? 255 : 0;
        data[i] = contrast;
        data[i + 1] = contrast;
        data[i + 2] = contrast;
      }
      cropCtx.putImageData(imageData, 0, 0);

      const processedImage = cropCanvas.toDataURL('image/png');
      runOCR(processedImage);
    }
  };

  const runOCR = (imageDataUrl) => {
    setOcrText('Extracting text...');
    Tesseract.recognize(imageDataUrl, 'ara+eng', {
      logger: m => console.log(m),
    }).then(({ data: { text } }) => {
      setOcrText(text || 'No text found.');
    }).catch((err) => {
      console.error('OCR Error:', err);
      setOcrText('OCR failed.');
    });
  };

  const saveImage = () => {
    if (!capturedImage) return;
    const babyName = babyData?.name?.trim();
    const babyMRN = babyData?.mrn?.trim();

    if (!babyName || !babyMRN) {
      alert("Please enter Baby Name and MRN before saving.");
      return;
    }

    const fileName = `Mother_ID_Scan_Back_${babyName}_${babyMRN}.png`;
    const link = document.createElement('a');
    link.href = capturedImage;
    link.download = fileName;
    link.click();
  };

  const retakeImage = () => {
    setCapturedImage(null);
    setOcrText('');
    setIdConfirmed(false);
  };

  const closeCamera = () => {
    stopCamera();
    setCapturedImage(null);
    setOcrText('');
    setIdConfirmed(false);
  };

  return (
    <div style={{ width: '50%', padding: '10px', boxSizing: 'border-box', border: '1px solid lightgray' }}>
      <h3 style={{ textAlign: 'left' }}>Scan Back Side of Mother ID</h3>

      {!capturing && (
        <div>
          <button onClick={() => setCapturing(true)}>Start Camera</button>
        </div>
      )}

      {capturing && (
        <div style={{ position: 'relative' }}>
          <video
            ref={videoRef}
            autoPlay
            playsInline
            style={{ width: '300px', height: '200px', border: '1px solid black' }}
          />
          <div
            style={{
              position: 'absolute',
              top: '90px',
              left: 'calc(50% - 75px)',
              width: '150px',
              height: '80px',
              border: '2px dashed red',
              pointerEvents: 'none'
            }}
          />
          <div style={{ marginTop: '10px' }}>
            <label>
              <input
                type="checkbox"
                checked={idConfirmed}
                onChange={(e) => setIdConfirmed(e.target.checked)}
              />{" "}
              I confirm the ID is fully visible inside the red box.
            </label>
            <br />
            <button onClick={captureImage} disabled={!idConfirmed}>Capture Image</button>
            <button onClick={closeCamera} style={{ marginLeft: '10px' }}>Close</button>
          </div>
        </div>
      )}

      {capturedImage && (
        <div style={{ marginTop: '10px' }}>
          <h4>Captured Image:</h4>
          <img src={capturedImage} alt="Scanned ID" style={{ width: '300px', height: '200px' }} />
          <div style={{ marginTop: '10px' }}>
            <button onClick={saveImage}>Save Image</button>
            <button onClick={retakeImage} style={{ marginLeft: '10px' }}>Retake</button>
            <button onClick={closeCamera} style={{ marginLeft: '10px' }}>Close</button>
          </div>
          <div style={{ marginTop: '10px' }}>
            <h4>Extracted Text:</h4>
            <pre style={{ whiteSpace: 'pre-wrap', backgroundColor: '#f4f4f4', padding: '10px', border: '1px solid #ccc' }}>
              {ocrText}
            </pre>
          </div>
        </div>
      )}

      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </div>
  );
};

export default MotherInfoIDScanBack;
