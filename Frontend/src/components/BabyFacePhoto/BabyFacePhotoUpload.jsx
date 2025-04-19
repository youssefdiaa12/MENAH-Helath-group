import React, { useState, useContext } from "react";
import { BabyContext } from "../../context/BabyContext";

const BabyFacePhotoUpload = ({ setUploadedVideo }) => {
  const { babyData } = useContext(BabyContext);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.type.startsWith("video/")) {
        if (file.size > 5 * 1024 * 1024) {
          alert("File size must be less than 5MB.");
          return;
        }
        setUploadedFile(file);
        setPreviewUrl(URL.createObjectURL(file));
        setUploadedVideo(file); // ✅ Ensures uploaded video is correctly passed
      } else {
        alert("Invalid file format. Please upload a video file.");
      }
    }
  };

  return (
    <div style={{ marginBottom: "20px", border: "1px solid gray", padding: "10px", borderRadius: "5px" }}>
      <h4>Upload Baby Face Photo</h4>

      {/* Default message */}
      <p style={{ fontSize: "14px", color: "gray" }}>
        {uploadedFile ? `Selected file: ${uploadedFile.name}` : "Upload Baby Face Photo if you cannot capture by camera."}
      </p>

      <input type="file" accept="video/*" onChange={handleFileUpload} />

      {previewUrl && (
        <div style={{ marginTop: "10px" }}>
          <h5>Preview</h5>
          <video src={previewUrl} controls style={{ width: "100%", maxWidth: "400px", borderRadius: "5px" }}></video>
        </div>
      )}
    </div>
  );
};

export default BabyFacePhotoUpload;