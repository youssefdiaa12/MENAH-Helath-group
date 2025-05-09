import { useState, useRef } from "react"
import { Camera, Upload } from "lucide-react"

const MotherID = () => {
  const [expandedSection, setExpandedSection] = useState(null)
  const [frontImage, setFrontImage] = useState(null)
  const [backImage, setBackImage] = useState(null)
  const [isCameraActive, setIsCameraActive] = useState(false)
  const [activeSide, setActiveSide] = useState(null)

  const videoRef = useRef(null)
  const canvasRef = useRef(null)

  const toggleSection = (section) => {
    if (expandedSection === section) {
      setExpandedSection(null)
    } else {
      setExpandedSection(section)
    }
  }

  const startCamera = async (side) => {
    setActiveSide(side)
    setIsCameraActive(true)

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      })

      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }
    } catch (err) {
      console.error("Error accessing camera:", err)
    }
  }

  const captureImage = () => {
    if (videoRef.current && canvasRef.current && activeSide) {
      const video = videoRef.current
      const canvas = canvasRef.current
      const context = canvas.getContext("2d")

      if (context) {
        canvas.width = video.videoWidth
        canvas.height = video.videoHeight
        context.drawImage(video, 0, 0, canvas.width, canvas.height)

        const imageData = canvas.toDataURL("image/jpeg")

        if (activeSide === "front") {
          setFrontImage(imageData)
        } else {
          setBackImage(imageData)
        }

        // Stop camera stream
        const stream = video.srcObject
        if (stream) {
          stream.getTracks().forEach((track) => track.stop())
        }

        setIsCameraActive(false)
        setActiveSide(null)
      }
    }
  }

  const handleFileUpload = (e, side) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const imageData = event.target?.result
        if (side === "front") {
          setFrontImage(imageData)
        } else {
          setBackImage(imageData)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const sendToAPI = () => {
    // Implement API submission logic here
    if (frontImage && backImage) {
      console.log("Ready to send to API:", { frontImage, backImage })
      // Example API call:
      // fetch('/api/mother-id', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ frontImage, backImage })
      // })
    } else {
      alert("Please capture both sides of the ID")
    }
  }

  return (
    <div className=" p-4">
      <div className="flex justify-between items-center mb-12">
        <div className="text-sm text-gray-500">Baby Name</div>
        <h1 className="text-xl font-medium">Mother Identification</h1>
        <div className="text-sm text-gray-500">Baby MRN</div>
      </div>

      <p className="text-sm mb-4">
        Please provide a clear copy of both the front and back of the mother official ID. Choose the method that works
        best with you.
      </p>

      {/* Camera Section */}
      <div className="border rounded-lg mb-4 overflow-hidden">
        <button
          className="w-full p-4 flex items-center justify-center gap-2 bg-white hover:bg-gray-50"
          onClick={() => toggleSection("camera")}
        >
          <Camera className="h-5 w-5 text-blue-500" />
          <span>By Camera</span>
          <span className="ml-auto text-blue-500">📷</span>
        </button>

        {expandedSection === "camera" && (
          <div className="grid grid-cols-2 divide-x border-t">
            <div className="p-4">
              <p className="mb-2 text-center">Capture Front Side of Mother ID</p>
              {frontImage ? (
                <div className="relative">
                  <img src={frontImage || "/placeholder.svg"} alt="Front ID" className="w-full h-auto rounded" />
                  <button
                    onClick={() => setFrontImage(null)}
                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => startCamera("front")}
                  className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
                >
                  Start Camera
                </button>
              )}
            </div>
            <div className="p-4">
              <p className="mb-2 text-center">Capture Back Side of Mother ID</p>
              {backImage ? (
                <div className="relative">
                  <img src={backImage || "/placeholder.svg"} alt="Back ID" className="w-full h-auto rounded" />
                  <button
                    onClick={() => setBackImage(null)}
                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => startCamera("back")}
                  className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
                >
                  Start Camera
                </button>
              )}
            </div>
          </div>
        )}
      </div>


      {/* Upload Section */}
      <div className="border rounded-lg mb-4 overflow-hidden">
        <button
          className="w-full p-4 flex items-center justify-center gap-2 bg-white hover:bg-gray-50"
          onClick={() => toggleSection("upload")}
        >
          <Upload className="h-5 w-5 text-blue-500" />
          <span>By Uploading</span>
          <span className="ml-auto text-blue-500">📁</span>
        </button>

        {expandedSection === "upload" && (
          <div className="grid grid-cols-2 divide-x border-t">
            <div className="p-4">
              <p className="mb-2 text-center">Upload Front Side of Mother ID</p>
              <label className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded block text-center cursor-pointer">
                Choose File
                <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileUpload(e, "front")} />
              </label>
              {frontImage && (
                <div className="mt-2 relative">
                  <img src={frontImage || "/placeholder.svg"} alt="Front ID" className="w-full h-auto rounded" />
                  <button
                    onClick={() => setFrontImage(null)}
                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
                  >
                    ✕
                  </button>
                </div>
              )}
            </div>
            <div className="p-4">
              <p className="mb-2 text-center">Upload Back Side of Mother ID</p>
              <label className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded block text-center cursor-pointer">
                Choose File
                <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileUpload(e, "back")} />
              </label>
              {backImage && (
                <div className="mt-2 relative">
                  <img src={backImage || "/placeholder.svg"} alt="Back ID" className="w-full h-auto rounded" />
                  <button
                    onClick={() => setBackImage(null)}
                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
                  >
                    ✕
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Camera Modal */}
      {isCameraActive && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg max-w-lg w-full">
            <h3 className="text-lg font-medium mb-2">Capture {activeSide === "front" ? "Front" : "Back"} Side of ID</h3>
            <div className="relative">
              <video ref={videoRef} autoPlay playsInline className="w-full h-auto rounded" />
              <canvas ref={canvasRef} className="hidden" />
            </div>
            <div className="flex justify-between mt-4">
              <button
                onClick={() => {
                  if (videoRef.current) {
                    const stream = videoRef.current.srcObject
                    if (stream) {
                      stream.getTracks().forEach((track) => track.stop())
                    }
                  }
                  setIsCameraActive(false)
                  setActiveSide(null)
                }}
                className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded"
              >
                Cancel
              </button>
              <button onClick={captureImage} className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
                Capture
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Submit Button */}
      {frontImage && backImage && (
        <button
          onClick={sendToAPI}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-lg mt-4"
        >
          Submit ID Information
        </button>
      )}
    </div>
  )
}

export default MotherID
