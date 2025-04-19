import React, { useState } from "react";

const BabyFacePhotoHelp = () => {
  const [showHelp, setShowHelp] = useState(false);

  return (
    <div style={{ textAlign: "center", marginTop: "10px" }}>
      <button
        onClick={() => setShowHelp(true)}
        style={{
          padding: "8px",
          backgroundColor: "#007bff",
          color: "white",
          borderRadius: "5px",
          cursor: "pointer"
        }}
      >
        Help
      </button>

      {showHelp && (
        <div
          style={{
            marginTop: "10px",
            padding: "15px",
            border: "1px solid black",
            backgroundColor: "#f8f9fa",
            textAlign: "left",
            maxWidth: "600px",
            marginLeft: "auto",
            marginRight: "auto",
            borderRadius: "5px",
            fontSize: "14px",
            lineHeight: "1.5"
          }}
        >
          <h3 style={{ color: "#333", textAlign: "center" }}>📌 Baby Face Video Capture & Upload Guide</h3>

          <p><strong>🔹 Why is capturing the baby's face important?</strong></p>
          <p>The baby's face video is used for *identity verification* to ensure safety in *breast milk administration* and other neonatal care procedures.</p>

          <p><strong>📸 Capturing Baby's Face Using Camera:</strong></p>
          <ul>
            <li>Press the *"Open Camera"* button to start recording.</li>
            <li>Ensure the *baby's face is fully visible* and not covered by blankets or hands.</li>
            <li>Record a short *3 to 5 second video* with the baby in a *calm and well-lit environment*.</li>
            <li>If the baby has an *ETT (Endotracheal Tube), NGT (Nasogastric Tube), or OGT (Orogastric Tube), try recording **multiple angles* to capture the *most visible side of the face*.</li>
            <li>Press *"Stop Recording"* once done.</li>
            <li>Review the video before saving. You can choose to *Retake or Save*.</li>
          </ul>

          <p><strong>📁 Uploading a Pre-Recorded Video:</strong></p>
          <ul>
            <li>Click *"Upload Video"* and select a *valid file (MP4 or WebM)*.</li>
            <li>The video should be *3 to 5 seconds* in duration.</li>
            <li>Ensure the video *clearly shows the baby's face*.</li>
            <li>Blurry or obstructed videos *may not be accepted*.</li>
            <li>After selecting the file, *press Save* to store the video.</li>
          </ul>

          <p><strong>⚠ Legal & Ethical Notice:</strong></p>
          <ul>
            <li>The system *automatically records the nurse's name* for accountability.</li>
            <li>Uploading a *different baby's photo* is strictly *prohibited*.</li>
            <li>If any *mistake is made*, the admin must be informed immediately.</li>
          </ul>

          <button
            onClick={() => setShowHelp(false)}
            style={{
              marginTop: "10px",
              padding: "8px",
              backgroundColor: "red",
              color: "white",
              borderRadius: "5px",
              cursor: "pointer",
              width: "100%"
            }}
          >
            Close Help
          </button>
        </div>
      )}
    </div>
  );
};

export default BabyFacePhotoHelp;