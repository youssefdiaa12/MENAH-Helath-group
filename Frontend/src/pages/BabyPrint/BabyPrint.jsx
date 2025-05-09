"use client"
import { useState } from "react"

const BabyFootPrint = () => {
  const [activeTab, setActiveTab] = useState("capture")

  return (
    <div className=" p-4">
      <div className="flex items-center justify-between mb-6">
        <div className="text-sm font-medium text-gray-500">Baby Name</div>
        <div className="text-lg font-medium text-center">Baby Foot Print</div>
        <div className="text-sm font-medium text-gray-500">Baby MRN</div>
      </div>

      {/* Capture Baby Footprint */}
      <div className="border rounded-lg p-4 mb-4">
        <div className="flex items-start">
          <div className="bg-blue-100 rounded-full p-2 mr-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-blue-600"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-medium mb-2">Capture Baby Footprint</h2>
            <ol className="list-decimal list-inside text-sm text-gray-600 mb-4 pl-1">
              <li>Place the baby's foot flat on clean white paper</li>
              <li>Make sure there is good lighting</li>
              <li>Keep the camera above the footprint (no angles)</li>
              <li>Click "Capture" when footprint is clear</li>
              <li>Retake the photo if it's blurry or cut off</li>
            </ol>
          </div>
          <div className="ml-4 w-40 h-32 bg-gray-100 rounded-md overflow-hidden flex items-center justify-center">
            <div className="bg-black w-full h-full flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-white opacity-50"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
          </div>
        </div>
        <div className="flex justify-end mt-2">
          <button
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md text-sm transition-colors"
            onClick={() => setActiveTab("capture")}
          >
            Start Capture
          </button>
        </div>
      </div>

      {/* Scan the Baby Footprint */}
      <div className="border rounded-lg p-4 mb-4">
        <div className="flex items-start">
          <div className="bg-blue-100 rounded-full p-2 mr-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-blue-600"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-medium mb-2">Scan the Baby Footprint</h2>
            <ol className="list-decimal list-inside text-sm text-gray-600 mb-4 pl-1">
              <li>Clean and dry the baby's foot before scanning</li>
              <li>Place the baby's foot flat on the scanner glass</li>
              <li>Hold the baby still during the scanning process</li>
              <li>Cover the foot lightly with a soft white cloth</li>
              <li>Start the scan and make sure the entire foot is captured</li>
            </ol>
          </div>
          <div className="ml-4 w-40 h-32 bg-gray-100 rounded-md overflow-hidden flex items-center justify-center">
            <div className="bg-black w-full h-full flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-white opacity-50"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                />
              </svg>
            </div>
          </div>
        </div>
        <div className="flex justify-end mt-2">
          <button
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md text-sm transition-colors"
            onClick={() => setActiveTab("scan")}
          >
            Start Scanning
          </button>
        </div>
      </div>

      {/* Manual Footprint Photo */}
      <div className="border rounded-lg p-4 mb-4">
        <div className="flex items-start">
          <div className="bg-blue-100 rounded-full p-2 mr-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-blue-600"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-medium mb-2">Manual Footprint Photo</h2>
            <ol className="list-decimal list-inside text-sm text-gray-600 mb-4 pl-1">
              <li>Make sure the footprint is clear and not blurry</li>
              <li>Ensure the image is well lit with no shadows</li>
              <li>The full foot should be visible in the frame</li>
              <li>Use a white or light colored background</li>
              <li>Avoid angled shots or dark backgrounds</li>
            </ol>
          </div>
          <div className="ml-4 w-40 flex flex-col items-center justify-center">
            <div className="border-2 border-dashed border-gray-300 rounded-md p-4 flex flex-col items-center justify-center w-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-gray-400 mb-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0l-4 4m4-4v12"
                />
              </svg>
              <div className="text-xs text-center text-gray-500">
                Choose a file
                <br />
                or
                <br />
                Drag & Drop
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Legal & Ethical Notice */}
      <div className="border rounded-lg p-6 shadow-sm">
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

export default BabyFootPrint
