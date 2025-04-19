import React, { useState, useRef, useEffect, useContext } from "react";
import * as faceapi from "face-api.js"; // ✅ Importing Face-API.js
import { BabyContext } from "../../context/BabyContext";

const BabyFacePhotoCapture = ({ setCapturedVideo }) => {  // ✅ Added prop
  const { babyData } = useContext(BabyContext);
  const [recording, setRecording] = useState(false);
  const [videoBlob, setVideoBlob] = useState(null);
  const [stream, setStream] = useState(null);
  const [faceDetected, setFaceDetected] = useState(false); // ✅ Track face detection
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const recordedChunks = useRef([]);

  useEffect(() => {
    const loadModels = async () => {
      await faceapi.nets.tinyFaceDetector.loadFromUri("/models"); // ✅ Load Face-API.js model
    };
    loadModels();
  }, []);

  useEffect(() => {
    if (recording) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then((mediaStream) => {
          setStream(mediaStream);
          if (videoRef.current) {
            videoRef.current.srcObject = mediaStream;
            videoRef.current.onloadedmetadata = () => {
              videoRef.current.play();
            };
            detectFace(); // ✅ Start face detection when camera opens
          }
        })
        .catch((err) => console.error("Error accessing camera:", err));
    }
  }, [recording]);

  const detectFace = async () => {
    if (videoRef.current) {
      const interval = setInterval(async () => {
        const detections = await faceapi.detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions());

        if (detections.length > 0) {
          const face = detections[0].box;
          const faceSize = face.width * face.height;

          if (faceSize < 50000) { // ✅ Approximate size threshold for newborn
            setFaceDetected(true);
          } else {
            setFaceDetected(false);
          }
        } else {
          setFaceDetected(false);
        }
      }, 1000); // ✅ Check face detection every second

      return () => clearInterval(interval);
    }
  };

  const startCamera = () => {
    setVideoBlob(null);
    setRecording(true);
  };

  const startRecording = () => {
    if (!faceDetected) {
      alert("No newborn detected. Please position the baby’s face properly.");
      return;
    }

    if (stream) {
      recordedChunks.current = [];
      const mediaRecorder = new MediaRecorder(stream, { mimeType: "video/webm" });
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          recordedChunks.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(recordedChunks.current, { type: "video/webm" });
        setVideoBlob(blob);
        setCapturedVideo(blob); // ✅ Pass captured video
      };

      mediaRecorder.start();
      setTimeout(() => {
        stopRecording();
      }, 5000);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
    setRecording(false);
  };

  const retakeVideo = () => {
    setVideoBlob(null);
    setCapturedVideo(null);  // ✅ Reset captured video
    setRecording(false);
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
    setRecording(false);
    setVideoBlob(null);
    setCapturedVideo(null);  // ✅ Reset captured video
  };

  return (
    <div style={{ marginBottom: "20px", border: "1px solid gray", padding: "10px", borderRadius: "5px" }}>
      <h4>Capture Baby Face Video</h4>

      {!recording && (
        <button onClick={startCamera} style={{ padding: "8px", backgroundColor: "#008CBA", color: "white", borderRadius: "5px", cursor: "pointer" }}>
          Open Camera
        </button>
      )}

      {recording && (
        <>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <video ref={videoRef} autoPlay playsInline muted style={{ width: "100%", maxWidth: "400px", borderRadius: "5px", backgroundColor: "black", display: "block" }}></video>
          <canvas ref={canvasRef} style={{ display: "none" }}></canvas>

          <p style={{ color: faceDetected ? "green" : "red", fontWeight: "bold" }}>
            {faceDetected ? "Newborn detected. Ready to record." : "No newborn detected."}
          </p>

          <div style={{ marginTop: "10px" }}>
            <button onClick={startRecording} disabled={!faceDetected} style={{
              padding: "8px",
              backgroundColor: faceDetected ? "#4CAF50" : "gray",
              color: "white",
              borderRadius: "5px",
              cursor: faceDetected ? "pointer" : "not-allowed",
              marginRight: "10px"
            }}>
              Start Recording
            </button>

            <button onClick={stopCamera} style={{ padding: "8px", backgroundColor: "#555", color: "white", borderRadius: "5px", cursor: "pointer" }}>
              Close Camera
            </button>
          </div>
          </div>
        </>
      )}

      {videoBlob && (
        <div style={{ marginTop: "10px" }}>
          <h5>Recorded Video</h5>
          <video src={URL.createObjectURL(videoBlob)} controls style={{ width: "100%", maxWidth: "400px", borderRadius: "5px" }}></video>

           <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginTop: "10px" }}>
           <button
onClick={() => {
  if (!babyData.babyName || !babyData.babyMRN) {
    alert("Please enter Baby Name and MRN before saving.");
    return;
  }
  const fileName = `Baby_Face_Video_${babyData.babyName}_${babyData.babyMRN}.webm`;
  const link = document.createElement("a");
  link.href = URL.createObjectURL(videoBlob);
  link.download = fileName;
  link.click();
  setCapturedVideo(videoBlob);
}}
  style={{ padding: "8px", backgroundColor: "#4CAF50", color: "white", borderRadius: "5px", cursor: "pointer", marginTop: "10px", marginLeft: "10px" }}
>
  Save Video
</button>
  <button onClick={retakeVideo} style={{ padding: "8px", backgroundColor: "#f44336", color: "white", borderRadius: "5px", cursor: "pointer" }}>
    Retake Video
  </button>
  <button onClick={stopCamera} style={{ padding: "8px", backgroundColor: "#999", color: "white", borderRadius: "5px", cursor: "pointer" }}>
    Close
  </button>
</div>

        </div>
      )}
    </div>
  );
};

export default BabyFacePhotoCapture;