import React, { useContext, useState } from "react";
import { BabyContext } from "../../context/BabyContext";

const BabyFacePhotoSave = ({ capturedVideo, uploadedVideo }) => {
  const { babyData, userRole } = useContext(BabyContext);
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    if (!babyData.babyName || !babyData.babyMRN) {
      alert("Cannot save. Please ensure Baby Name and MRN are entered.");
      return;
    }

    let videoToSave = capturedVideo || uploadedVideo;

    if (!videoToSave) {
      alert("No video available to save.");
      return;
    }

    const videoName = `Face_Photo_${babyData.babyName}_${babyData.babyMRN}`;

    // Convert Blob to URL before saving
    const videoUrl = URL.createObjectURL(videoToSave);

    // Store in localStorage (or replace with actual saving method)
    localStorage.setItem(videoName, videoUrl);

    setIsSaved(true);
    alert(`Video saved successfully as: ${videoName}`);
  };

  const handleDelete = () => {
    if (userRole !== "admin") {
      alert("Only an admin can delete saved videos.");
      return;
    }

    localStorage.removeItem(`Face_Photo_${babyData.babyName}_${babyData.babyMRN}`);
    setIsSaved(false);
    alert("Video deleted successfully.");
  };

  return (
    <div style={{ marginTop: "10px", textAlign: "center" }}>
        <p>Debug: Captured Video: {capturedVideo ? "Yes" : "No"}, Uploaded Video: {uploadedVideo ? "Yes" : "No"}</p>

        {capturedVideo || uploadedVideo ? (
            <button
                onClick={handleSave}
                style={{
                    padding: "10px",
                    backgroundColor: isSaved ? "gray" : "green",
                    color: "white",
                    borderRadius: "5px",
                    cursor: isSaved ? "not-allowed" : "pointer"
                }}
                disabled={isSaved}
            >
                {isSaved ? "Saved" : "Save Video"}
            </button>
        ) : (
            <p>No video available to save.</p>
        )}

        {isSaved && userRole === "admin" && (
            <button
                onClick={handleDelete}
                style={{
                    marginLeft: "10px",
                    padding: "10px",
                    backgroundColor: "red",
                    color: "white",
                    borderRadius: "5px",
                    cursor: "pointer"
                }}
            >
                Delete Video (Admin Only)
            </button>
        )}
    </div>
  );
};

export default BabyFacePhotoSave;