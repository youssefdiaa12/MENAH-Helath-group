import React, { useState, useEffect } from 'react';
import cv from '@techstark/opencv-js';

const BabyFootPrintUpload = ({ babyName, babyMRN }) => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [isFootprintValid, setIsFootprintValid] = useState(false);
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
        validateFootprint(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateFootprint = (imageData) => {
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

        // Footprint should have a reasonable area & be more vertical than horizontal
        if (area > 10000 && area < 100000 && aspectRatio < 0.6) {
          let hull = new cv.Mat();
          cv.convexHull(contour, hull, false, true);

          let defects = new cv.Mat();
          cv.convexityDefects(contour, hull, defects);

          // Check if the footprint has at least 2 convexity defects (for arch/toe curves)
          if (defects.rows >= 2) {
            validContours++;
            console.log("Valid footprint detected!");
          }

          hull.delete();
          defects.delete();
        }
      }

      setIsFootprintValid(validContours > 0);
      console.log(validContours > 0 ? "Footprint detected!" : "No valid footprint detected.");

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
      alert('No uploaded footprint to save.');
      return;
    }
    if (!isFootprintValid) {
      alert('No valid footprint detected. Please upload a proper footprint image.');
      return;
    }

    const fileName = `Foot_Print_Upload_${babyName}_${babyMRN}.png`;
    const link = document.createElement('a');
    link.href = uploadedImage;
    link.download = fileName;
    link.click();

    alert('Footprint uploaded and saved successfully.');
  };

  const handleRemove = () => {
    setUploadedImage(null);
    setIsFootprintValid(false);
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h4>Upload Baby Foot Print</h4>
      <input type="file" accept="image/*" onChange={handleUpload} />
      {uploadedImage && (
        <div>
          <img src={uploadedImage} alt="Uploaded Footprint" style={{ width: '30%', marginTop: '10px' }} />
          <br />
          <button onClick={handleSave} disabled={!isFootprintValid} style={{ marginTop: '10px' }}>
            Save
          </button>
          <button onClick={handleRemove} style={{ marginLeft: '10px', marginTop: '10px' }}>
            Remove
          </button>
          {!isFootprintValid && uploadedImage && <p style={{ color: 'red' }}>No valid footprint detected.</p>}
        </div>
      )}
    </div>
  );
};

export default BabyFootPrintUpload;