"use client";

import { useState, useRef, useEffect } from "react";
import { Printer, Check, X, Camera, Info } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { Html5QrcodeScanner } from "html5-qrcode";

const data = [
  {
    id: 1,
    babyID: "BTL-78303865",
    name: "QR Code 1",
    content: "BTL-78303865-1",
    description: "This is the first QR code.",
    createdAt: "2023-10-01",
    updatedAt: "2023-10-02",
    status: "active",
    type: "type1",
    size: "small",
    color: "red",
    motherID: "MOM-12345",
    backgroundColor: "white",
    errorCorrectionLevel: "L",
    margin: 4,
    patientInfo: {
      name: "John Doe",
      age: 30,
      gender: "Male",
      bloodType: "A+",
      allergies: ["Penicillin", "Peanuts"],
      medications: ["Aspirin", "Insulin"],
    },
  },
  {
    id: 2,
    name: "QR Code 2",
    content: "BTL-78303865-2",
    babyID: "BTL-78303864",
    description: "This is the second QR code.",
    createdAt: "2023-10-03",
    updatedAt: "2023-10-04",
    status: "inactive",
    type: "type2",
    size: "medium",
    color: "blue",
    motherID: "MOM-12346",
    backgroundColor: "white",
    errorCorrectionLevel: "M",
    margin: 8,
    patientInfo: {
      name: "Jane Smith",
      age: 45,
      gender: "Female",
      bloodType: "O-",
      allergies: ["Sulfa", "Latex"],
      medications: ["Lisinopril", "Metformin"],
    },
  },
  {
    id: 3,
    name: "QR Code 3",
    content: "BTL-78303865-3",
    babyID: "BTL-78303863",
    description: "This is the third QR code.",
    createdAt: "2023-10-05",
    updatedAt: "2023-10-06",
    status: "active",
    type: "type3",
    size: "large",
    color: "green",
    motherID: "MOM-12347",
    backgroundColor: "white",
    errorCorrectionLevel: "Q",
    margin: 12,
    patientInfo: {
      name: "Robert Johnson",
      age: 62,
      gender: "Male",
      bloodType: "B+",
      allergies: ["Shellfish"],
      medications: ["Atorvastatin", "Amlodipine"],
    },
  },
  {
    id: 4,
    name: "QR Code 4",
    babyID: "BTL-78303862",
    content: "BTL-78303865-4",
    description: "This is the fourth QR code.",
    createdAt: "2023-10-07",
    updatedAt: "2023-10-08",
    status: "inactive",
    type: "type4",
    size: "extra-large",
    color: "yellow",
    motherID: "MOM-12348",
    backgroundColor: "white",
    errorCorrectionLevel: "H",
    margin: 16,
    patientInfo: {
      name: "Emily Davis",
      age: 28,
      gender: "Female",
      bloodType: "AB+",
      allergies: ["None"],
      medications: ["Levothyroxine"],
    },
  },
  {
    id: 5,
    name: "QR Code 5",
    babyID: "BTL-78303861",

    content: "BTL-78303865-5",
    description: "This is the fifth QR code.",
    createdAt: "2023-10-09",
    updatedAt: "2023-10-10",
    status: "active",
    type: "type5",
    size: "small",
    color: "purple",
    motherID: "MOM-12349",
    backgroundColor: "white",
    errorCorrectionLevel: "L",
    margin: 4,
    patientInfo: {
      name: "Michael Wilson",
      age: 55,
      gender: "Male",
      bloodType: "A-",
      allergies: ["Ibuprofen"],
      medications: ["Losartan", "Simvastatin"],
    },
  },
  {
    id: 6,
    name: "QR Code 6",
    content: "BTL-78303865-6",
    babyID: "BTL-78303860",

    description: "This is the sixth QR code.",
    createdAt: "2023-10-11",
    updatedAt: "2023-10-12",
    status: "inactive",
    type: "type6",
    size: "medium",
    motherID: "MOM-12350",
    color: "orange",
    backgroundColor: "white",
    errorCorrectionLevel: "M",
    margin: 8,
    patientInfo: {
      name: "Sarah Brown",
      age: 37,
      gender: "Female",
      bloodType: "O+",
      allergies: ["Dairy"],
      medications: ["Escitalopram"],
    },
  },
  {
    id: 7,
    name: "QR Code 7",
    babyID: "BTL-78303867",
    content: "BTL-78303865-7",
    description: "This is the seventh QR code.",
    createdAt: "2023-10-13",
    updatedAt: "2023-10-14",
    status: "active",
    type: "type7",
    size: "large",
    color: "pink",
    motherID: "MOM-12351",
    backgroundColor: "white",
    errorCorrectionLevel: "Q",
    margin: 12,
    patientInfo: {
      name: "David Miller",
      age: 42,
      gender: "Male",
      bloodType: "B-",
      allergies: ["Pollen", "Dust"],
      medications: ["Fluticasone", "Montelukast"],
    },
  },
  {
    id: 8,
    babyID: "BTL-78303868",

    name: "QR Code 8",
    content: "BTL-78303865-8",
    description: "This is the eighth QR code.",
    createdAt: "2023-10-15",
    updatedAt: "2023-10-16",
    status: "inactive",
    type: "type8",
    motherID: "MOM-12352",
    size: "extra-large",
    color: "brown",
    backgroundColor: "white",
    errorCorrectionLevel: "H",
    margin: 16,
    patientInfo: {
      name: "Jennifer Taylor",
      age: 33,
      gender: "Female",
      bloodType: "AB-",
      allergies: ["Bee stings"],
      medications: ["Cetirizine"],
    },
  },
];

const QRCode = () => {
  const [selectedQRCodes, setSelectedQRCodes] = useState([]);
  const [showRangeModal, setShowRangeModal] = useState(false);
  const [showScannerModal, setShowScannerModal] = useState(false);
  const [showScannedDataModal, setShowScannedDataModal] = useState(false);
  const [rangeStart, setRangeStart] = useState("");
  const [rangeEnd, setRangeEnd] = useState("");
  const [scannedData, setScannedData] = useState(null);
  const [scannerInitialized, setScannerInitialized] = useState(false);
  const printFrameRef = useRef(null);
  const scannerRef = useRef(null);

  // Handle selection of a QR code
  const handleSelect = (id) => {
    if (selectedQRCodes.includes(id)) {
      setSelectedQRCodes(selectedQRCodes.filter((qrId) => qrId !== id));
    } else {
      setSelectedQRCodes([...selectedQRCodes, id]);
    }
  };

  // Select all QR codes
  const selectAll = () => {
    setSelectedQRCodes(data.map((item) => item.id));
  };

  // Deselect all QR codes
  const deselectAll = () => {
    setSelectedQRCodes([]);
  };

  // Open range selection modal
  const openRangeModal = () => {
    setShowRangeModal(true);
  };

  // Close range selection modal
  const closeRangeModal = () => {
    setShowRangeModal(false);
    setRangeStart("");
    setRangeEnd("");
  };

  // Apply range selection
  const applyRangeSelection = () => {
    const start = Number.parseInt(rangeStart, 10);
    const end = Number.parseInt(rangeEnd, 10);

    if (
      isNaN(start) ||
      isNaN(end) ||
      start < 1 ||
      end > data.length ||
      start > end
    ) {
      alert(`Please enter a valid range between 1 and ${data.length}`);
      return;
    }

    const rangeIds = [];
    for (let i = start; i <= end; i++) {
      rangeIds.push(i);
    }

    setSelectedQRCodes(rangeIds);
    closeRangeModal();
  };

  // Open QR code scanner
  const openScanner = () => {
    setShowScannerModal(true);
  };

  // Close QR code scanner
  const closeScanner = () => {
    if (scannerRef.current) {
      scannerRef.current.clear();
    }
    setShowScannerModal(false);
    setScannerInitialized(false);
  };

  // Initialize QR code scanner
  useEffect(() => {
    if (showScannerModal && !scannerInitialized) {
      const scanner = new Html5QrcodeScanner(
        "qr-reader",
        { fps: 10, qrbox: { width: 250, height: 250 } },
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

  // Handle successful QR code scan
  const onScanSuccess = (decodedText) => {
    // Find the QR code data that matches the scanned content
    const matchedQRCode = data.find((item) => item.content === decodedText);

    if (matchedQRCode) {
      setScannedData(matchedQRCode);
      closeScanner();
      setShowScannedDataModal(true);
    } else {
      alert("QR code not found in the database!");
    }
  };

  // Handle QR code scan failure
  const onScanFailure = (error) => {
    console.warn(`QR code scan error: ${error}`);
  };

  // Close scanned data modal
  const closeScannedDataModal = () => {
    setShowScannedDataModal(false);
    setScannedData(null);
  };

  // Print selected QR codes
  const printSelected = () => {
    if (selectedQRCodes.length === 0) {
      alert("Please select at least one QR code to print");
      return;
    }

    // Create a new window for printing
    const printWindow = window.open("", "_blank");

    if (!printWindow) {
      alert("Please allow popups for this website to print QR codes");
      return;
    }

    const selectedItems = data.filter((item) =>
      selectedQRCodes.includes(item.id)
    );

    // Generate HTML content for printing
    const printContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>QR Codes Print</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
          }
          .print-container {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 20px;
          }
          .qr-item {
            border: 1px solid #ddd;
            padding: 15px;
            text-align: center;
            page-break-inside: avoid;
          }
          .qr-title {
            margin-top: 10px;
            font-weight: bold;
          }
          .qr-id {
            font-size: 12px;
            color: #666;
          }
          @media print {
            @page {
              size: A4;
              margin: 0.5cm;
            }
            body {
              padding: 0;
            }
          }
        </style>
      </head>
      <body>
        <div class="print-container">
          ${selectedItems
            .map(
              (item) => `
            <div class="qr-item">
              <svg width="128" height="128" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
                ${document.getElementById(`qr-svg-${item.id}`).innerHTML}
              </svg>
              <div class="qr-title">Bottle #${item.id}</div>
              <div class="qr-id">BTL-78303865</div>
            </div>
          `
            )
            .join("")}
        </div>
        <script>
          window.onload = function() {
            window.print();
            setTimeout(function() { window.close(); }, 500);
          };
        </script>
      </body>
      </html>
    `;

    printWindow.document.open();
    printWindow.document.write(printContent);
    printWindow.document.close();
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <div className="text-xl font-semibold">Baby Name</div>
        <div className="text-2xl font-bold">QR Code Generation</div>
        <div className="text-xl font-semibold">Baby MRN</div>
      </div>

      <div className="flex justify-center gap-2 mb-6 flex-wrap">
        <button
          onClick={selectAll}
          className="bg-green-400 hover:bg-green-500 text-white px-4 py-2 rounded"
        >
          Select All
        </button>
        <button
          onClick={deselectAll}
          className="bg-green-400 hover:bg-green-500 text-white px-4 py-2 rounded"
        >
          Deselect All
        </button>
        <button
          onClick={openRangeModal}
          className="bg-green-400 hover:bg-green-500 text-white px-4 py-2 rounded"
        >
          Select Range
        </button>
        <button
          onClick={printSelected}
          disabled={selectedQRCodes.length === 0}
          className={`${
            selectedQRCodes.length > 0
              ? "bg-green-400 hover:bg-green-500"
              : "bg-gray-300"
          } text-white px-4 py-2 rounded flex items-center gap-1`}
        >
          <Printer size={16} />
          Print Selected
        </button>
        <button
          onClick={openScanner}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-1"
        >
          <Camera size={16} />
          Scan QR Code
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {data.map((qrCode) => (
          <div
            key={qrCode.id}
            onClick={() => handleSelect(qrCode.id)}
            className={`border rounded-md p-4 cursor-pointer transition-all ${
              selectedQRCodes.includes(qrCode.id)
                ? "border-green-500 bg-green-50"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <div className="relative">
              {selectedQRCodes.includes(qrCode.id) && (
                <div className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full p-1">
                  <Check size={16} />
                </div>
              )}
              <div className="flex justify-center">
                <div className="w-32 h-32 border border-gray-200 flex items-center justify-center">
                  <div id={`qr-svg-${qrCode.id}`}>
                    <QRCodeSVG
                      value={qrCode.content}
                      size={120}
                      level="M"
                      includeMargin={true}
                    />
                  </div>
                </div>
              </div>
              <div className="text-center mt-2">
                <div className="font-medium">Bottle #{qrCode.id}</div>
                <div className="text-xs text-gray-500">BTL-78303865</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Range Selection Modal */}
      {showRangeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 max-w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Select Range</h3>
              <button
                onClick={closeRangeModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="rangeStart"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Start (1-{data.length})
                </label>
                <input
                  type="number"
                  id="rangeStart"
                  min="1"
                  max={data.length}
                  value={rangeStart}
                  onChange={(e) => setRangeStart(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label
                  htmlFor="rangeEnd"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  End (1-{data.length})
                </label>
                <input
                  type="number"
                  id="rangeEnd"
                  min="1"
                  max={data.length}
                  value={rangeEnd}
                  onChange={(e) => setRangeEnd(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  onClick={closeRangeModal}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={applyRangeSelection}
                  className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* QR Code Scanner Modal */}
      {showScannerModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Scan QR Code</h3>
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
              <div className="flex justify-end gap-2 pt-2">
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

      {/* Scanned Data Modal */}
      {showScannedDataModal && scannedData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">QR Code Data</h3>
              <button
                onClick={closeScannedDataModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-32 h-32 border border-gray-200 flex items-center justify-center shrink-0">
                  <QRCodeSVG
                    value={scannedData.content}
                    size={120}
                    level="M"
                    includeMargin={true}
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-lg">{scannedData.name}</h4>
                  <p className="text-gray-600 mb-2">
                    {scannedData.description}
                  </p>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
                    <div className="font-medium">ID:</div>
                    <div>{scannedData.id}</div>
                    <div className="font-medium">Status:</div>
                    <div>
                      <span
                        className={`inline-block px-2 py-0.5 rounded-full text-xs ${
                          scannedData.status === "active"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {scannedData.status}
                      </span>
                    </div>
                    <div className="font-medium">Created:</div>
                    <div>{scannedData.createdAt}</div>
                    <div className="font-medium">Updated:</div>
                    <div>{scannedData.updatedAt}</div>
                    <div className="font-medium">Type:</div>
                    <div>{scannedData.type}</div>
                    <div className="font-medium">Size:</div>
                    <div>{scannedData.size}</div>
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-semibold text-md mb-2 flex items-center gap-1">
                  <Info size={16} />
                  Patient Information
                </h4>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                  <div className="font-medium">Name:</div>
                  <div>{scannedData.patientInfo.name}</div>
                  <div className="font-medium">Age:</div>
                  <div>{scannedData.patientInfo.age}</div>
                  <div className="font-medium">Gender:</div>
                  <div>{scannedData.patientInfo.gender}</div>
                  <div className="font-medium">Blood Type:</div>
                  <div>{scannedData.patientInfo.bloodType}</div>
                  <div className="font-medium">Allergies:</div>
                  <div>
                    {scannedData.patientInfo.allergies.length > 0
                      ? scannedData.patientInfo.allergies.join(", ")
                      : "None"}
                  </div>
                  <div className="font-medium">Medications:</div>
                  <div>{scannedData.patientInfo.medications.join(", ")}</div>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  onClick={closeScannedDataModal}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hidden iframe for printing */}
      <iframe
        ref={printFrameRef}
        style={{ display: "none" }}
        title="Print Frame"
      />
    </div>
  );
};

export default QRCode;
