"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import Webcam from "react-webcam"
import { Camera, Upload, AlertCircle, CheckCircle, XCircle } from "lucide-react"

const BabyFacePhoto = () => {
  const [captureMode, setCaptureMode] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [recordedChunks, setRecordedChunks] = useState([])
  const [videoSrc, setVideoSrc] = useState(null)
  const [uploadedVideo, setUploadedVideo] = useState(null)
  const [dragActive, setDragActive] = useState(false)
  const [recordingDuration, setRecordingDuration] = useState(0)
  const [recordingTimer, setRecordingTimer] = useState(null)

  // Face detection states
  const [faceApiLoaded, setFaceApiLoaded] = useState(false)
  const [faceApiLoading, setFaceApiLoading] = useState(false)
  const [faceApiError, setFaceApiError] = useState(null)
  const [faceDetected, setFaceDetected] = useState(false)
  const [isBabyFace, setIsBabyFace] = useState(false)
  const [detectionMessage, setDetectionMessage] = useState("")
  const [detectionStatus, setDetectionStatus] = useState("waiting") // waiting, success, error

  const webcamRef = useRef(null)
  const mediaRecorderRef = useRef(null)
  const fileInputRef = useRef(null)
  const detectionIntervalRef = useRef(null)
  const canvasRef = useRef(null)
  const faceapi = useRef(null)

  // Load face-api.js dynamically
  useEffect(() => {
    const loadFaceApi = async () => {
      try {
        setFaceApiLoading(true)
        setDetectionMessage("Loading face detection...")

        // Dynamically import face-api.js
        const faceApiModule = await import("face-api.js")
        faceapi.current = faceApiModule

        // Check if models directory exists
        const modelCheckResponse = await fetch("/models/tiny_face_detector_model-weights_manifest.json", {
          method: "HEAD",
        }).catch(() => ({ ok: false }))

        if (!modelCheckResponse.ok) {
          throw new Error("Face detection models not found. Please ensure models are in the public/models directory.")
        }

        // Load the models
        await Promise.all([
          faceapi.current.nets.tinyFaceDetector.loadFromUri("/models"),
          faceapi.current.nets.ageGenderNet.loadFromUri("/models"),
        ])

        setFaceApiLoaded(true)
        setFaceApiLoading(false)
        setDetectionMessage("Face detection ready")
        console.log("Face detection models loaded successfully")
      } catch (error) {
        console.error("Error loading face detection:", error)
        setFaceApiError(error.message)
        setFaceApiLoading(false)
        setDetectionMessage(`Face detection unavailable: ${error.message}`)
      }
    }

    loadFaceApi()

    return () => {
      if (detectionIntervalRef.current) {
        clearInterval(detectionIntervalRef.current)
      }
    }
  }, [])

  // Handle camera access
  const handleOpenCamera = useCallback(() => {
    setCaptureMode(true)
    setDetectionStatus("waiting")
    setDetectionMessage(faceApiLoaded ? "Waiting for face detection..." : "Face detection not available")

    // Start face detection when camera is opened (if face-api is loaded)
    if (faceApiLoaded) {
      setTimeout(() => {
        if (webcamRef.current && webcamRef.current.video) {
          startFaceDetection()
        }
      }, 1000)
    }
  }, [faceApiLoaded])

  // Face detection function
  const startFaceDetection = useCallback(() => {
    if (!faceapi.current || !faceApiLoaded) return

    if (detectionIntervalRef.current) {
      clearInterval(detectionIntervalRef.current)
    }

    const video = webcamRef.current.video

    detectionIntervalRef.current = setInterval(async () => {
      if (video && video.readyState === 4) {
        try {
          // Detect faces
          const detections = await faceapi.current
            .detectAllFaces(video, new faceapi.current.TinyFaceDetectorOptions())
            .withAgeAndGender()

          if (detections.length > 0) {
            setFaceDetected(true)

            // Get the age estimation
            const age = detections[0].age
            console.log("Detected face with estimated age:", age)

            // Check if it's likely a baby (age < 3)
            const isBaby = age < 3
            setIsBabyFace(isBaby)

            if (isBaby) {
              setDetectionStatus("success")
              setDetectionMessage("Baby face detected! You can start recording.")
            } else {
              setDetectionStatus("error")
              setDetectionMessage(
                `Detected face appears to be ${Math.round(age)} years old. Please ensure this is a baby.`,
              )
            }
          } else {
            setFaceDetected(false)
            setIsBabyFace(false)
            setDetectionStatus("waiting")
            setDetectionMessage("No face detected. Please ensure baby's face is visible.")
          }
        } catch (error) {
          console.error("Face detection error:", error)
          setDetectionStatus("error")
          setDetectionMessage("Face detection error. Please try again.")
        }
      }
    }, 500)
  }, [faceApiLoaded])

  // Start recording
  const handleStartRecording = useCallback(() => {
    // If face detection is available, check if a baby face is detected
    if (faceApiLoaded) {
      if (!faceDetected) {
        setDetectionStatus("error")
        setDetectionMessage("No face detected. Please ensure baby's face is visible.")
        return
      }

      if (!isBabyFace) {
        setDetectionStatus("error")
        setDetectionMessage("Detected face doesn't appear to be a baby. Please verify.")
        return
      }
    }

    setIsRecording(true)
    setRecordedChunks([])
    setRecordingDuration(0)

    if (webcamRef.current && webcamRef.current.stream) {
      mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
        mimeType: "video/webm",
      })

      mediaRecorderRef.current.addEventListener("dataavailable", ({ data }) => {
        if (data.size > 0) {
          setRecordedChunks((prev) => [...prev, data])
        }
      })

      mediaRecorderRef.current.start()

      // Start a timer to track recording duration
      const timer = setInterval(() => {
        setRecordingDuration((prev) => {
          // Auto-stop recording after 5 seconds
          if (prev >= 5) {
            clearInterval(timer)
            handleStopRecording()
            return prev
          }
          return prev + 1
        })
      }, 1000)

      setRecordingTimer(timer)

      // Stop face detection during recording to save resources
      if (detectionIntervalRef.current) {
        clearInterval(detectionIntervalRef.current)
      }
    }
  }, [faceApiLoaded, faceDetected, isBabyFace])

  // Stop recording
  const handleStopRecording = useCallback(() => {
    setIsRecording(false)

    // Clear the recording timer
    if (recordingTimer) {
      clearInterval(recordingTimer)
      setRecordingTimer(null)
    }

    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop()
      setTimeout(() => {
        if (recordedChunks.length) {
          const blob = new Blob(recordedChunks, {
            type: "video/webm",
          })
          const url = URL.createObjectURL(blob)
          setVideoSrc(url)

          // Restart face detection if needed
          if (faceApiLoaded && webcamRef.current && webcamRef.current.video) {
            startFaceDetection()
          }
        }
      }, 100)
    }
  }, [recordedChunks, recordingTimer, faceApiLoaded, startFaceDetection])

  // Retake video
  const handleRetake = useCallback(() => {
    setVideoSrc(null)
    setRecordedChunks([])

    // Restart face detection if needed
    if (faceApiLoaded && webcamRef.current && webcamRef.current.video) {
      startFaceDetection()
    }
  }, [faceApiLoaded, startFaceDetection])

  // Save recorded video
  const handleSaveVideo = useCallback(() => {
    if (recordedChunks.length) {
      const blob = new Blob(recordedChunks, {
        type: "video/webm",
      })

      // Here you would typically upload the blob to your server
      console.log("Video saved:", blob)

      // For demo purposes, we'll just show a success message
      alert("Baby video saved successfully!")
    }
  }, [recordedChunks])

  // Handle file upload via click
  const handleFileUploadClick = () => {
    fileInputRef.current?.click()
  }

  // Handle file change from input
  const handleFileChange = (e) => {
    const file = e.target.files?.[0]
    handleFile(file)
  }

  // Handle file drop
  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }

  // Process the uploaded file
  const handleFile = (file) => {
    if (file && file.type.startsWith("video/")) {
      const url = URL.createObjectURL(file)
      setUploadedVideo(url)
    } else {
      alert("Please upload a valid video file")
    }
  }

  // Handle drag events
  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()

    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  // Use the uploaded video
  const handleUseUploadedVideo = () => {
    // Here you would typically process the uploaded video
    console.log("Using uploaded video:", uploadedVideo)
    alert("Video selected successfully!")
  }

  // Upload another video
  const handleUploadAgain = () => {
    setUploadedVideo(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  // Render detection status indicator
  const renderDetectionStatus = () => {
    if (!captureMode || videoSrc || !faceApiLoaded) return null

    return (
      <div
        className={`mt-2 p-2 rounded-md text-sm flex items-center gap-2 ${
          detectionStatus === "success"
            ? "bg-green-100 text-green-800"
            : detectionStatus === "error"
              ? "bg-red-100 text-red-800"
              : "bg-blue-100 text-blue-800"
        }`}
      >
        {detectionStatus === "success" ? (
          <CheckCircle className="h-4 w-4" />
        ) : detectionStatus === "error" ? (
          <XCircle className="h-4 w-4" />
        ) : (
          <AlertCircle className="h-4 w-4" />
        )}
        <span>{detectionMessage}</span>
      </div>
    )
  }

  return (
    <div className=" p-6 min-h-screen">
      <h1 className="text-2xl font-semibold text-center mb-6">Baby Face Photo</h1>

      {/* Face API Status Banner */}
      {faceApiError && (
        <div className="mb-4 p-3 bg-yellow-100 border border-yellow-300 rounded-md text-sm">
          <p className="font-medium">Face Detection Setup Required</p>
          <p className="mt-1">{faceApiError}</p>
          <p className="mt-2">To enable baby face detection, please follow these steps:</p>
          <ol className="list-decimal pl-5 mt-1 space-y-1">
            <li>
              Download face-api.js models from{" "}
              <a
                href="https://github.com/justadudewhohacks/face-api.js/tree/master/weights"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                GitHub
              </a>
            </li>
            <li>
              Create a <code className="bg-gray-100 px-1 rounded">public/models</code> folder in your project
            </li>
            <li>Copy the model files into this folder</li>
            <li>Refresh this page</li>
          </ol>
          <p className="mt-2">You can still use the app without face detection.</p>
        </div>
      )}

      {/* Capture Video Section */}
      <div className="bg-white rounded-lg p-6 mb-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-start gap-4">
          <div className="flex items-center md:items-start">
            <div className="bg-gray-100 p-2 rounded-full mr-3">
              <Camera className="h-5 w-5 sm:h-6 sm:w-6 text-gray-600" />
            </div>
            <h2 className="text-base sm:text-lg font-medium md:hidden">Capture Baby Face Video</h2>
          </div>

          <div className="flex-1">
            <h2 className="text-lg font-medium mb-3 hidden md:block">Capture Baby Face Video</h2>
            <ol className="list-decimal pl-5 mb-4 text-xs sm:text-sm text-gray-700 space-y-1">
              <li>Make sure the baby&apos;s face is fully visible.</li>
              <li>Remove any hats or blankets covering the face.</li>
              <li>For babies with ETT/NGT/OGT tubes: Capture multiple angles to show the clearest side of the face.</li>
              <li>If the video is not clear, click &quot;Retake&quot; to try again.</li>
              <li>Click &quot;Save video&quot; to store the video.</li>
            </ol>
          </div>

          <div className="w-full md:w-64 h-36 bg-gray-100 rounded-md overflow-hidden flex items-center justify-center relative">
            {captureMode && !videoSrc ? (
              <>
                <Webcam
                  audio={false}
                  ref={webcamRef}
                  videoConstraints={{
                    facingMode: "user",
                  }}
                  className="w-full h-full object-cover"
                />
                <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />
              </>
            ) : videoSrc ? (
              <video src={videoSrc} controls className="w-full h-full object-cover" />
            ) : (
              <div className="text-gray-400 text-xs sm:text-sm text-center p-4">Video preview will appear here</div>
            )}
          </div>
        </div>

        {renderDetectionStatus()}

        {isRecording && (
          <div className="mt-2 p-2 rounded-md bg-red-100 text-red-800 text-sm flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></div>
            <span>Recording: {recordingDuration}s / 5s</span>
          </div>
        )}

        <div className="mt-4 flex flex-wrap justify-end gap-2">
          {!captureMode && !videoSrc && (
            <button
              onClick={handleOpenCamera}
              className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
              disabled={faceApiLoading}
            >
              {faceApiLoading ? "Loading Face Detection..." : "Open Camera"}
            </button>
          )}

          {captureMode && !videoSrc && !isRecording && (
            <button
              onClick={handleStartRecording}
              className={`py-2 px-4 rounded text-white ${
                !faceApiLoaded || isBabyFace ? "bg-green-500 hover:bg-green-600" : "bg-gray-400"
              }`}
              disabled={faceApiLoaded && !isBabyFace}
            >
              Start Recording
            </button>
          )}

          {isRecording && (
            <button onClick={handleStopRecording} className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded">
              Stop Recording
            </button>
          )}

          {videoSrc && (
            <>
              <button onClick={handleRetake} className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded">
                Retake
              </button>
              <button
                onClick={handleSaveVideo}
                className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
              >
                Save Video
              </button>
            </>
          )}
        </div>
      </div>

      {/* Upload Video Section */}
      <div className="bg-white rounded-lg p-4 sm:p-6 mb-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-start gap-4">
          <div className="flex items-center md:items-start">
            <div className="bg-gray-100 p-2 rounded-full mr-3">
              <Upload className="h-5 w-5 sm:h-6 sm:w-6 text-gray-600" />
            </div>
            <h2 className="text-base sm:text-lg font-medium md:hidden">Upload Baby Face Video</h2>
          </div>

          <div className="flex-1">
            <h2 className="text-lg font-medium mb-3 hidden md:block">Upload Baby Face Video</h2>
            <ol className="list-decimal pl-5 mb-4 text-xs sm:text-sm text-gray-700 space-y-1">
              <li>Make sure the baby&apos;s face is fully visible.</li>
              <li>The video should be 3 to 5 seconds in duration.</li>
              <li>Only upload clear video with good lighting.</li>
              <li>After selecting the file, click &quot;Save video&quot; to store the video.</li>
            </ol>
          </div>

          <div className="w-full md:w-64 h-36 bg-gray-100 rounded-md overflow-hidden flex items-center justify-center">
            {uploadedVideo ? (
              <video src={uploadedVideo} controls className="w-full h-full object-cover" />
            ) : (
              <div className="text-gray-400 text-xs sm:text-sm text-center p-4">Uploaded video will appear here</div>
            )}
          </div>
        </div>

        <div className="mt-4">
          {!uploadedVideo ? (
            <div
              className={`border-2 border-dashed rounded-md p-4 sm:p-6 flex flex-col items-center justify-center cursor-pointer ${
                dragActive ? "border-green-500 bg-green-50" : "border-gray-300"
              }`}
              onClick={handleFileUploadClick}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input ref={fileInputRef} type="file" accept="video/*" className="hidden" onChange={handleFileChange} />
              <div className="mb-2 sm:mb-3 p-2 bg-gray-100 rounded-full">
                <Upload className="h-5 w-5 sm:h-6 sm:w-6 text-gray-500" />
              </div>
              <p className="text-xs sm:text-sm font-medium text-gray-700">Choose a file or Drag it here</p>
            </div>
          ) : (
            <div className="flex justify-center space-x-2">
              <button
                onClick={handleUseUploadedVideo}
                className="bg-green-500 hover:bg-green-600 text-white py-1.5 sm:py-2 px-3 sm:px-4 rounded text-sm"
              >
                Use Video
              </button>
              <button
                onClick={handleUploadAgain}
                className="bg-gray-500 hover:bg-gray-600 text-white py-1.5 sm:py-2 px-3 sm:px-4 rounded text-sm"
              >
                Upload Again
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Legal & Ethical Notice */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h2 className="text-lg font-medium mb-3">Legal & Ethical Notice</h2>
        <div className="space-y-2 text-sm text-gray-700">
          <div className="flex items-start">
            <span className="mr-2 font-medium">1.</span>
            <p>
              The system <span className="font-medium">automatically records the nurse&apos;s name</span> for accountability.
            </p>
          </div>
          <div className="flex items-start">
            <span className="mr-2 font-medium">2.</span>
            <p>
              Uploading a <span className="font-medium">different baby&apos;s photo</span> is strictly{" "}
              <span className="font-medium">prohibited</span>.
            </p>
          </div>
          <div className="flex items-start">
            <span className="mr-2 font-medium">3.</span>
            <p>
              If any <span className="font-medium">mistake is made</span>, the admin must be informed immediately.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BabyFacePhoto
