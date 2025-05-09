"use client";

import { useState, useRef, useEffect } from "react";
import { Camera, CheckCircle, X } from "lucide-react";
import { Html5QrcodeScanner } from "html5-qrcode";
import Swal from "sweetalert2";

const EBMVerification = () => {
  // State for tracking current step
  const [currentStep, setCurrentStep] = useState(1);

  // State for bottle data (from first QR scan)
  const [bottleData, setBottleData] = useState(null);

  // State for verification data
  const [babyVerified, setBabyVerified] = useState(false);
  const [motherVerified, setMotherVerified] = useState(false);

  // State for nurse selection
  const [selectedNurse, setSelectedNurse] = useState("");
  const [nurses, setNurses] = useState([
    { id: "N001", name: "Nurse Johnson" },
    { id: "N002", name: "Nurse Williams" },
    { id: "N003", name: "Nurse Davis" },
    { id: "N004", name: "Nurse Miller" },
    { id: "N005", name: "Nurse Wilson" },
  ]);

  // Scanner modal states
  const [showScannerModal, setShowScannerModal] = useState(false);
  const [scannerType, setScannerType] = useState(null); // 'bottle', 'wristband', or 'motherID'
  const [scannerInitialized, setScannerInitialized] = useState(false);

  // Scanner ref
  const scannerRef = useRef(null);

  // Initialize QR scanner when modal is opened
  useEffect(() => {
    if (showScannerModal && !scannerInitialized) {
      const scanner = new Html5QrcodeScanner(
        "qr-reader",
        { fps: 10, qrbox: { width: 350, height: 350 } },
        /* verbose= */ false
      );

      scanner.render(onScanSuccess, onScanFailure);
      scannerRef.current = scanner;
      setScannerInitialized(true);
    }

    return () => {
      if (scannerRef.current && !showScannerModal) {
        try {
          scannerRef.current.clear();
        } catch (error) {
          console.error("Error clearing scanner:", error);
        }
      }
    };
  }, [showScannerModal, scannerInitialized]);

  // Handle successful QR scan
  const onScanSuccess = (decodedText) => {
    try {
      // Parse QR code data (assuming JSON format)
      const data = JSON.parse(decodedText);

      // Process based on scanner type
      if (scannerType === "bottle") {
        handleBottleScan(data);
      } else if (scannerType === "wristband") {
        handleWristbandScan(data);
      } else if (scannerType === "motherID") {
        handlemotherIDScan(data);
      }

      // Close scanner
      closeScanner();
    } catch (error) {
      Swal.fire({
        title: "Invalid QR Code",
        text: "The QR code could not be processed. Please try again.",
        icon: "error",
      });
    }
  };

  // Handle QR scan failure
  const onScanFailure = (error) => {
    console.error("QR Scan error:", error);
  };

  // Open QR scanner modal
  const openScanner = (type) => {
    setScannerType(type);
    setShowScannerModal(true);
  };

  // Close QR scanner modal
  const closeScanner = () => {
    if (scannerRef.current) {
      try {
        scannerRef.current.clear();
      } catch (error) {
        console.error("Error clearing scanner:", error);
      }
    }
    setShowScannerModal(false);
    setScannerInitialized(false);
    setScannerType(null);
  };

  // Handle bottle scan
  const handleBottleScan = (data) => {
    if (!data.bottleId || !data.babyID || !data.motherID) {
      Swal.fire({
        title: "Invalid QR Code",
        text: "The bottle QR code is missing required information.",
        icon: "error",
      });
      return;
    }

    setBottleData(data);

    Swal.fire({
      title: "Bottle Scanned Successfully!",
      text: `Bottle ID: ${data.bottleId}`,
      icon: "success",
    }).then(() => {
      // Move to next step
      setCurrentStep(2);
    });
  };

  // Handle wristband scan
  const handleWristbandScan = (data) => {
    if (!data.babyID) {
      Swal.fire({
        title: "Invalid QR Code",
        text: "The wristband QR code is missing baby ID information.",
        icon: "error",
      });
      return;
    }

    // Verify baby ID matches the bottle
    if (data.babyID === bottleData.babyID) {
      Swal.fire({
        title: "Baby Verified!",
        text: "The baby ID matches the bottle.",
        icon: "success",
      }).then(() => {
        setBabyVerified(true);
      });
    } else {
      Swal.fire({
        title: "Wrong Baby!",
        text: "The baby ID does not match the bottle.",
        icon: "error",
      });
    }
  };

  // Handle mother ID scan
  const handlemotherIDScan = (data) => {
    if (!data.motherID) {
      Swal.fire({
        title: "Invalid QR Code",
        text: "The mother ID QR code is missing required information.",
        icon: "error",
      });
      return;
    }

    // Verify mother ID matches the bottle
    if (data.motherID === bottleData.motherID) {
      Swal.fire({
        title: "Mother Verified!",
        text: "The mother ID matches the bottle.",
        icon: "success",
      }).then(() => {
        setMotherVerified(true);
        // Move to next step
        setCurrentStep(3);
      });
    } else {
      Swal.fire({
        title: "Wrong Mother!",
        text: "The mother ID does not match the bottle.",
        icon: "error",
      });
    }
  };

  // Handle nurse selection
  const handleNurseChange = (e) => {
    setSelectedNurse(e.target.value);
  };

  // Handle verification request
  const handleRequestVerification = () => {
    if (!selectedNurse) {
      Swal.fire({
        title: "Selection Required",
        text: "Please select a nurse to verify.",
        icon: "warning",
      });
      return;
    }

    // Here you would typically send the verification data to your backend
    Swal.fire({
      title: "Verification Requested!",
      text: `Verification request sent to ${
        nurses.find((n) => n.id === selectedNurse)?.name
      }.`,
      icon: "success",
    }).then(() => {
      // Reset the form for a new verification
      setCurrentStep(1);
      setBottleData(null);
      setBabyVerified(false);
      setMotherVerified(false);
      setSelectedNurse("");
    });
  };

  // For testing - simulate bottle scan
  const simulateBottleScan = () => {
    handleBottleScan({
      bottleId: "B12345",
      babyID: "BABY001",
      motherID: "MOTHER001",
    });
  };

  // For testing - simulate wristband scan
  const simulateWristbandScan = () => {
    handleWristbandScan({
      babyID: "BABY001",
    });
  };

  // For testing - simulate mother ID scan
  const simulatemotherIDScan = () => {
    handlemotherIDScan({
      motherID: "MOTHER001",
    });
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="text-sm text-gray-500">Baby Name</div>
        <h1 className="text-xl font-medium">EBM Verification</h1>
        <div className="text-sm text-gray-500">Baby MRN</div>
      </div>

      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div className="flex flex-col items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                currentStep >= 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 text-gray-600"
              }`}
            >
              1
            </div>
            <div
              className={`mt-2 text-xs ${
                currentStep >= 1 ? "text-blue-500" : "text-gray-500"
              }`}
            >
              <button className="bg-blue-500 text-white px-3 py-1 rounded-md text-xs">
                Scan
              </button>
            </div>
          </div>

          <div
            className={`flex-1 h-1 mx-2 ${
              currentStep >= 2 ? "bg-blue-500" : "bg-gray-300"
            }`}
          ></div>

          <div className="flex flex-col items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                currentStep >= 2
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 text-gray-600"
              }`}
            >
              2
            </div>
            <div
              className={`mt-2 text-xs ${
                currentStep >= 2 ? "text-blue-500" : "text-gray-500"
              }`}
            >
              <button
                className={`${
                  currentStep >= 2
                    ? "bg-blue-500 text-white"
                    : "bg-gray-300 text-gray-600"
                } px-3 py-1 rounded-md text-xs`}
                disabled={currentStep < 2}
              >
                Compare
              </button>
            </div>
          </div>

          <div
            className={`flex-1 h-1 mx-2 ${
              currentStep >= 3 ? "bg-blue-500" : "bg-gray-300"
            }`}
          ></div>

          <div className="flex flex-col items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                currentStep >= 3
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 text-gray-600"
              }`}
            >
              3
            </div>
            <div
              className={`mt-2 text-xs ${
                currentStep >= 3 ? "text-blue-500" : "text-gray-500"
              }`}
            >
              <button
                className={`${
                  currentStep >= 3
                    ? "bg-blue-500 text-white"
                    : "bg-gray-300 text-gray-600"
                } px-3 py-1 rounded-md text-xs`}
                disabled={currentStep < 3}
              >
                Verify
              </button>
            </div>
          </div>

          <div
            className={`flex-1 h-1 mx-2 ${
              currentStep >= 4 ? "bg-blue-500" : "bg-gray-300"
            }`}
          ></div>

          <div className="flex flex-col items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                currentStep >= 4
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 text-gray-600"
              }`}
            >
              4
            </div>
            <div
              className={`mt-2 text-xs ${
                currentStep >= 4 ? "text-blue-500" : "text-gray-500"
              }`}
            >
              <button
                className={`${
                  currentStep >= 4
                    ? "bg-blue-500 text-white"
                    : "bg-gray-300 text-gray-600"
                } px-3 py-1 rounded-md text-xs`}
                disabled={currentStep < 4}
              >
                Approve
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Step 1: Scan Bottle QR */}
      <div
        className={`border rounded-lg p-6 mb-4 ${
          currentStep === 1 ? "bg-white" : "bg-gray-50"
        }`}
      >
        <h2 className="text-lg font-medium mb-2">Step 1:</h2>
        <p className="mb-4">Please scan the QR code on the milk bottle.</p>

        {currentStep === 1 && (
          <button
            className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded flex items-center gap-2"
            onClick={() => openScanner("bottle")}
          >
            <Camera size={18} />
            Scan Bottle QR
          </button>
        )}

        {currentStep > 1 && bottleData && (
          <div className="text-sm text-gray-600">
            <p>✓ Bottle scanned successfully (ID: {bottleData.bottleId})</p>
          </div>
        )}
      </div>

      {/* Step 2: Verify Baby and Mother */}
      <div
        className={`border rounded-lg p-6 mb-4 ${
          currentStep === 2 ? "bg-white" : "bg-gray-50"
        }`}
      >
        <h2 className="text-lg font-medium mb-2">Step 2:</h2>
        <p className="mb-4">
          Please verify the bottle match using baby data below.
        </p>

        {currentStep >= 2 && (
          <>
            <div className="mb-6">
              <button
                className={`flex items-center gap-2 border rounded-lg px-4 py-3 hover:bg-gray-50 ${
                  babyVerified ? "border-green-500" : ""
                }`}
                onClick={() => {
                  if (!babyVerified && currentStep === 2) {
                    openScanner("wristband");
                  }
                }}
                disabled={babyVerified || currentStep !== 2}
              >
                <img
                  src="/placeholder.svg?height=24&width=24"
                  alt="Wristband icon"
                  className="w-6 h-6"
                />
                <span>Wristband</span>
                {babyVerified && (
                  <CheckCircle className="ml-2 h-5 w-5 text-green-500" />
                )}
              </button>

              {babyVerified && (
                <div className="mt-2 text-sm text-green-600">
                  ✓ Baby verified successfully
                </div>
              )}
            </div>

            {(babyVerified || currentStep > 2) && (
              <>
                <div className="mt-6">
                  <p className="mb-2">If there is no match</p>
                  <p className="text-sm text-gray-600 mb-4">
                    Please verify the bottle match using mother data below.
                  </p>

                  <button
                    className={`flex items-center gap-2 border rounded-lg px-4 py-3 hover:bg-gray-50 ${
                      motherVerified ? "border-green-500" : ""
                    }`}
                    onClick={() => {
                      if (
                        !motherVerified &&
                        currentStep === 2 &&
                        babyVerified
                      ) {
                        openScanner("motherID");
                      }
                    }}
                    disabled={
                      motherVerified || currentStep !== 2 || !babyVerified
                    }
                  >
                    <img
                      src="/placeholder.svg?height=24&width=24"
                      alt="Mother ID icon"
                      className="w-6 h-6"
                    />
                    <span>Mother ID</span>
                    {motherVerified && (
                      <CheckCircle className="ml-2 h-5 w-5 text-green-500" />
                    )}
                  </button>

                  {motherVerified && (
                    <div className="mt-2 text-sm text-green-600">
                      ✓ Mother verified successfully
                    </div>
                  )}
                </div>
              </>
            )}
          </>
        )}
      </div>

      {/* Step 3: Nurse Verification */}
      <div
        className={`border rounded-lg p-6 ${
          currentStep === 3 ? "bg-white" : "bg-gray-50"
        }`}
      >
        <h2 className="text-lg font-medium mb-2">Step 3:</h2>
        <p className="mb-4">
          Please enter the second nurse ID to verify your request
        </p>

        {currentStep === 3 && (
          <>
            <div className="mb-4">
              <select
                className="w-full p-2 border rounded"
                value={selectedNurse}
                onChange={handleNurseChange}
              >
                <option value="">Select a nurse...</option>
                {nurses.map((nurse) => (
                  <option key={nurse.id} value={nurse.id}>
                    {nurse.name} ({nurse.id})
                  </option>
                ))}
              </select>
            </div>

            <button
              className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
              onClick={handleRequestVerification}
              disabled={!selectedNurse}
            >
              Request Verification
            </button>
          </>
        )}
      </div>

      {/* QR Code Scanner Modal */}
      {showScannerModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">
                {scannerType === "bottle"
                  ? "Scan Bottle QR Code"
                  : scannerType === "wristband"
                  ? "Scan Baby Wristband"
                  : "Scan Mother ID"}
              </h3>
              <button
                onClick={closeScanner}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>
            <div className="space-y-4">
              <div id="qr-reader" className="w-full"></div>
              <p className="text-sm text-gray-500 text-center">
                Position the QR code within the scanner area
              </p>

              {/* Test buttons for development - can be removed in production */}
              <div className="flex justify-between gap-2 pt-2">
                <button
                  onClick={() => {
                    if (scannerType === "bottle") simulateBottleScan();
                    else if (scannerType === "wristband")
                      simulateWristbandScan();
                    else if (scannerType === "motherID") simulatemotherIDScan();
                    closeScanner();
                  }}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Simulate Scan (Test)
                </button>
                <button
                  onClick={closeScanner}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EBMVerification;
