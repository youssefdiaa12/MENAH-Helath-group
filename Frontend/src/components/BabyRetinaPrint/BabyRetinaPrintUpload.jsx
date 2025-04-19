import React, { useState, useEffect } from 'react';
import cv from '@techstark/opencv-js';

const BabyRetinaPrintUpload = ({ babyName, babyMRN }) => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [isRetinaPrintValid, setIsRetinaPrintValid] = useState(false);
  const [opencvLoaded, setOpencvLoaded] = useState(false);

  useEffect(() => {
    const checkOpenCV = setInterval(() => {
      if (window.cv) {
        setOpencvLoaded(true);
        clearInterval(checkOpenCV);
      }
    }, 100);
    return () => clearInterval(checkOpenCV);
  }, []);

  const handleUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target.result);
        validateRetinaPrint(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateRetinaPrint = (imageData) => {
    if (!opencvLoaded) {
      alert("OpenCV is still loading. Please wait...");
      return;
    }

    let img = new Image();
    img.src = imageData;
    img.onload = () => {
      let canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      let ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);

      let src = cv.imread(canvas);
      let gray = new cv.Mat();
      let edges = new cv.Mat();
      let contours = new cv.MatVector();
      let hierarchy = new cv.Mat();

      cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY, 0);
      cv.GaussianBlur(gray, gray, new cv.Size(5, 5), 0, 0, cv.BORDER_DEFAULT);
      cv.Canny(gray, edges, 50, 150);
      cv.findContours(edges, contours, hierarchy, cv.RETR_EXTERNAL, cv.CHAIN_APPROX_SIMPLE);

      console.log("Contours detected:", contours.size());

      let validContours = 0;
      for (let i = 0; i < contours.size(); i++) {
        let contour = contours.get(i);
        let area = cv.contourArea(contour);
        let rect = cv.boundingRect(contour);
        let aspectRatio = rect.width / rect.height;

        // Retina pattern approximation
        if (area > 10000 && area < 100000 && aspectRatio < 1.2) {
          let hull = new cv.Mat();
          cv.convexHull(contour, hull, false, true);

          let defects = new cv.Mat();
          cv.convexityDefects(contour, hull, defects);

          if (defects.rows >= 2) {
            validContours++;
            console.log("Valid retina print detected!");
          }

          hull.delete();
          defects.delete();
        }
      }

      setIsRetinaPrintValid(validContours > 0);
      console.log(validContours > 0 ? "Retina print detected!" : "No valid retina print detected.");

      src.delete();
      gray.delete();
      edges.delete();
      contours.delete();
      hierarchy.delete();
    };
  };

  const handleSave = () => {
    if (!babyName || !babyMRN) {
      alert('Please enter Baby Name and MRN first.');
      return;
    }
    if (!uploadedImage) {
      alert('No uploaded retina print to save.');
      return;
    }
    if (!isRetinaPrintValid) {
      alert('No valid retina print detected. Please upload a proper image.');
      return;
    }

    const fileName = `Retina_Print_Upload_${babyName}_${babyMRN}.png`;
    const link = document.createElement('a');
    link.href = uploadedImage;
    link.download = fileName;
    link.click();

    alert('Retina print uploaded and saved successfully.');
  };

  const handleRemove = () => {
    setUploadedImage(null);
    setIsRetinaPrintValid(false);
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h4>Upload Baby Retina Print</h4>
      <input type="file" accept="image/*" onChange={handleUpload} />
      {uploadedImage && (
        <div>
          <img src={uploadedImage} alt="Uploaded Retina Print" style={{ width: '30%', marginTop: '10px' }} />
          <br />
          <button onClick={handleSave} disabled={!isRetinaPrintValid} style={{ marginTop: '10px' }}>
            Save
          </button>
          <button onClick={handleRemove} style={{ marginLeft: '10px', marginTop: '10px' }}>
            Remove
          </button>
          {!isRetinaPrintValid && uploadedImage && <p style={{ color: 'red' }}>No valid retina print detected.</p>}
        </div>
      )}
    </div>
  );
};

export default BabyRetinaPrintUpload;