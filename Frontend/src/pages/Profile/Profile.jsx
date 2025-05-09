import { useState } from "react";

const Profile = () => {
  // State to track which sections are expanded
  const [expandedSections, setExpandedSections] = useState({
    parents: false,
    babies: false,
    verificationHistory: false,
    pendingVerifications: false,
    loginHistory: false,
  });

  // State to track current page for each section
  const [currentPage, setCurrentPage] = useState({
    parents: 1,
    babies: 1,
    verificationHistory: 1,
    pendingVerifications: 1,
    loginHistory: 1,
  });

  // Toggle section expansion
  const toggleSection = (section) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section],
    });
  };

  // Handle page change
  const handlePageChange = (section, page) => {
    setCurrentPage({
      ...currentPage,
      [section]: page,
    });
  };

  return (
    <div className=" space-y-4 p-4">
      {/* Profile Information Card */}
      <div className="bg-white rounded-lg border p-6">
        <div className="flex items-center mb-6">
          <div>
            <h2 className="font-semibold text-lg">Sara Ahmed</h2>
            <p className="text-gray-500 text-sm">Active</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-1">
            <p className="text-sm text-gray-500">First Name</p>
            <div className="flex justify-between border p-2 rounded-md">
              <p>Sara</p>
              <button className="text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
                </svg>
              </button>
            </div>
          </div>

          <div className="space-y-1">
            <p className="text-sm text-gray-500">Last Name</p>
            <div className="flex justify-between border p-2 rounded-md">
              <p>Ahmed</p>
              <button className="text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
                </svg>
              </button>
            </div>
          </div>

          <div className="space-y-1">
            <p className="text-sm text-gray-500">Username</p>
            <div className="flex justify-between border p-2 rounded-md">
              <p>sara.ahmed</p>
              <button className="text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
                </svg>
              </button>
            </div>
          </div>

          <div className="space-y-1">
            <p className="text-sm text-gray-500">Password</p>
            <div className="flex justify-between border p-2 rounded-md">
              <p>••••••••</p>
              <button className="text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
                </svg>
              </button>
            </div>
          </div>

          <div className="space-y-1">
            <p className="text-sm text-gray-500">Phone</p>
            <div className="flex justify-between border p-2 rounded-md">
              <p>+20123456789</p>
              <button className="text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
                </svg>
              </button>
            </div>
          </div>

          <div className="space-y-1">
            <p className="text-sm text-gray-500">Email</p>
            <div className="flex justify-between border p-2 rounded-md">
              <p>saraahmed75@gmail.com</p>
              <button className="text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
                </svg>
              </button>
            </div>
          </div>

          <div className="space-y-1 col-span-2">
            <p className="text-sm text-gray-500">Address</p>
            <div className="flex justify-between border p-2 rounded-md">
              <p>123 Medical St., Cairo, Egypt</p>
              <button className="text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Parents Section */}
      <div className="bg-white rounded-lg border overflow-hidden">
        <div
          className="p-4 flex justify-between items-center cursor-pointer"
          onClick={() => toggleSection("parents")}
        >
          <div className="flex items-center">
            <h3 className="font-semibold">Parents</h3>

          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`transition-transform ${
              expandedSections.parents ? "rotate-180" : ""
            }`}
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>
        {!expandedSections.parents && (
          <div className="px-4 pb-2 text-sm text-gray-600">
            Click the arrow to show or hide profiles of all parents linked to
            babies under your care.
          </div>
        )}

        {expandedSections.parents && (
          <div className="px-4 pb-4">
            <div className="overflow-x-auto">
              <table className="min-w-full bg-blue-50 rounded-lg overflow-hidden">
                <thead className="bg-blue-500 text-white">
                  <tr>
                    <th className="py-2 px-4 text-left">Name</th>
                    <th className="py-2 px-4 text-left">Email</th>
                    <th className="py-2 px-4 text-left">Phone</th>
                    <th className="py-2 px-4 text-left">Role</th>
                  </tr>
                </thead>
                <tbody>
                  {currentPage.parents === 1 && (
                    <>
                      <tr className="border-b border-blue-100">
                        <td className="py-2 px-4">Ahmed Mohamed</td>
                        <td className="py-2 px-4">ahmedmohamed@gmail.com</td>
                        <td className="py-2 px-4">+20123456789</td>
                        <td className="py-2 px-4">Father</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4">Mona Ahmed</td>
                        <td className="py-2 px-4">monaahmed@gmail.com</td>
                        <td className="py-2 px-4">+20123456780</td>
                        <td className="py-2 px-4">Mother</td>
                      </tr>
                    </>
                  )}
                  {currentPage.parents === 2 && (
                    <>
                      <tr className="border-b border-blue-100">
                        <td className="py-2 px-4">Khaled Hassan</td>
                        <td className="py-2 px-4">khaledhassan@gmail.com</td>
                        <td className="py-2 px-4">+20123456790</td>
                        <td className="py-2 px-4">Father</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4">Fatima Ali</td>
                        <td className="py-2 px-4">fatimaali@gmail.com</td>
                        <td className="py-2 px-4">+20123456791</td>
                        <td className="py-2 px-4">Mother</td>
                      </tr>
                    </>
                  )}
                  {currentPage.parents === 3 && (
                    <>
                      <tr className="border-b border-blue-100">
                        <td className="py-2 px-4">Omar Sayed</td>
                        <td className="py-2 px-4">omarsayed@gmail.com</td>
                        <td className="py-2 px-4">+20123456792</td>
                        <td className="py-2 px-4">Father</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4">Nadia Mahmoud</td>
                        <td className="py-2 px-4">nadiamahmoud@gmail.com</td>
                        <td className="py-2 px-4">+20123456793</td>
                        <td className="py-2 px-4">Mother</td>
                      </tr>
                    </>
                  )}
                </tbody>
              </table>
            </div>
            <div className="flex justify-center mt-4 space-x-1">
              <button
                className={`w-8 h-8 rounded-full ${
                  currentPage.parents === 1 ? "bg-blue-100" : "bg-white border"
                } flex items-center justify-center`}
                onClick={() => handlePageChange("parents", 1)}
              >
                1
              </button>
              <button
                className={`w-8 h-8 rounded-full ${
                  currentPage.parents === 2 ? "bg-blue-100" : "bg-white border"
                } flex items-center justify-center`}
                onClick={() => handlePageChange("parents", 2)}
              >
                2
              </button>
              <button
                className={`w-8 h-8 rounded-full ${
                  currentPage.parents === 3 ? "bg-blue-100" : "bg-white border"
                } flex items-center justify-center`}
                onClick={() => handlePageChange("parents", 3)}
              >
                3
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Verification History Section */}
      <div className="bg-white rounded-lg border overflow-hidden">
        <div
          className="p-4 flex justify-between items-center cursor-pointer"
          onClick={() => toggleSection("verificationHistory")}
        >
          <div className="flex items-center">
            <h3 className="font-semibold">Verification History</h3>

          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`transition-transform ${
              expandedSections.verificationHistory ? "rotate-180" : ""
            }`}
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>
        {!expandedSections.verificationHistory && (
          <div className="px-4 pb-2 text-sm text-gray-600">
            Click the arrow to show or hide your verification records.
          </div>
        )}

        {expandedSections.verificationHistory && (
          <div className="px-4 pb-4">
            <div className="overflow-x-auto">
              <table className="min-w-full bg-blue-50 rounded-lg overflow-hidden">
                <thead className="bg-blue-500 text-white">
                  <tr>
                    <th className="py-2 px-4 text-left">Document</th>
                    <th className="py-2 px-4 text-left">ID Type</th>
                    <th className="py-2 px-4 text-left">Date</th>
                    <th className="py-2 px-4 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {currentPage.verificationHistory === 1 && (
                    <>
                      <tr className="border-b border-blue-100">
                        <td className="py-2 px-4">ID Card</td>
                        <td className="py-2 px-4">National ID</td>
                        <td className="py-2 px-4">12-04-2023</td>
                        <td className="py-2 px-4 text-green-600">Verified</td>
                      </tr>
                      <tr className="border-b border-blue-100">
                        <td className="py-2 px-4">License</td>
                        <td className="py-2 px-4">Medical License</td>
                        <td className="py-2 px-4">15-04-2023</td>
                        <td className="py-2 px-4 text-green-600">Verified</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4">Certificate</td>
                        <td className="py-2 px-4">Degree</td>
                        <td className="py-2 px-4">20-04-2023</td>
                        <td className="py-2 px-4 text-red-600">Failed</td>
                      </tr>
                    </>
                  )}
                  {currentPage.verificationHistory === 2 && (
                    <>
                      <tr className="border-b border-blue-100">
                        <td className="py-2 px-4">Passport</td>
                        <td className="py-2 px-4">Travel Document</td>
                        <td className="py-2 px-4">25-04-2023</td>
                        <td className="py-2 px-4 text-green-600">Verified</td>
                      </tr>
                      <tr className="border-b border-blue-100">
                        <td className="py-2 px-4">Certification</td>
                        <td className="py-2 px-4">Specialty</td>
                        <td className="py-2 px-4">28-04-2023</td>
                        <td className="py-2 px-4 text-green-600">Verified</td>
                      </tr>
                    </>
                  )}
                </tbody>
              </table>
            </div>
            <div className="flex justify-center mt-4 space-x-1">
              <button
                className={`w-8 h-8 rounded-full ${
                  currentPage.verificationHistory === 1
                    ? "bg-blue-100"
                    : "bg-white border"
                } flex items-center justify-center`}
                onClick={() => handlePageChange("verificationHistory", 1)}
              >
                1
              </button>
              <button
                className={`w-8 h-8 rounded-full ${
                  currentPage.verificationHistory === 2
                    ? "bg-blue-100"
                    : "bg-white border"
                } flex items-center justify-center`}
                onClick={() => handlePageChange("verificationHistory", 2)}
              >
                2
              </button>
              <button
                className={`w-8 h-8 rounded-full ${
                  currentPage.verificationHistory === 3
                    ? "bg-blue-100"
                    : "bg-white border"
                } flex items-center justify-center`}
                onClick={() => handlePageChange("verificationHistory", 3)}
              >
                3
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Babies Section */}
      <div className="bg-white rounded-lg border overflow-hidden">
        <div
          className="p-4 flex justify-between items-center cursor-pointer"
          onClick={() => toggleSection("babies")}
        >
          <div className="flex items-center">
            <h3 className="font-semibold">Babies</h3>

          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`transition-transform ${
              expandedSections.babies ? "rotate-180" : ""
            }`}
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>
        {!expandedSections.babies && (
          <div className="px-4 pb-2 text-sm text-gray-600">
            Click the arrow to show or hide to view list of basic information of
            babies in the system.
          </div>
        )}

        {expandedSections.babies && (
          <div className="px-4 pb-4">
            <div className="overflow-x-auto">
              <table className="min-w-full bg-blue-50 rounded-lg overflow-hidden">
                <thead className="bg-blue-500 text-white">
                  <tr>
                    <th className="py-2 px-4 text-left">Name</th>
                    <th className="py-2 px-4 text-left">Age</th>
                    <th className="py-2 px-4 text-left">Parent</th>
                    <th className="py-2 px-4 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {currentPage.babies === 1 && (
                    <>
                      <tr className="border-b border-blue-100">
                        <td className="py-2 px-4">Yara</td>
                        <td className="py-2 px-4">1 year</td>
                        <td className="py-2 px-4">Ahmed Mohamed</td>
                        <td className="py-2 px-4">Active Patient</td>
                      </tr>
                      <tr className="border-b border-blue-100">
                        <td className="py-2 px-4">Omar</td>
                        <td className="py-2 px-4">2 years</td>
                        <td className="py-2 px-4">Mona Ahmed</td>
                        <td className="py-2 px-4">Active Patient</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4">Nour</td>
                        <td className="py-2 px-4">6 months</td>
                        <td className="py-2 px-4">Ahmed Mohamed</td>
                        <td className="py-2 px-4">New Patient</td>
                      </tr>
                    </>
                  )}
                  {currentPage.babies === 2 && (
                    <>
                      <tr className="border-b border-blue-100">
                        <td className="py-2 px-4">Ali</td>
                        <td className="py-2 px-4">3 years</td>
                        <td className="py-2 px-4">Khaled Hassan</td>
                        <td className="py-2 px-4">Active Patient</td>
                      </tr>
                      <tr className="border-b border-blue-100">
                        <td className="py-2 px-4">Layla</td>
                        <td className="py-2 px-4">8 months</td>
                        <td className="py-2 px-4">Fatima Ali</td>
                        <td className="py-2 px-4">New Patient</td>
                      </tr>
                    </>
                  )}
                </tbody>
              </table>
            </div>
            <div className="flex justify-center mt-4 space-x-1">
              <button
                className={`w-8 h-8 rounded-full ${
                  currentPage.babies === 1 ? "bg-blue-100" : "bg-white border"
                } flex items-center justify-center`}
                onClick={() => handlePageChange("babies", 1)}
              >
                1
              </button>
              <button
                className={`w-8 h-8 rounded-full ${
                  currentPage.babies === 2 ? "bg-blue-100" : "bg-white border"
                } flex items-center justify-center`}
                onClick={() => handlePageChange("babies", 2)}
              >
                2
              </button>
              <button
                className={`w-8 h-8 rounded-full ${
                  currentPage.babies === 3 ? "bg-blue-100" : "bg-white border"
                } flex items-center justify-center`}
                onClick={() => handlePageChange("babies", 3)}
              >
                3
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Pending Verifications Section */}
      <div className="bg-white rounded-lg border overflow-hidden">
        <div
          className="p-4 flex justify-between items-center cursor-pointer"
          onClick={() => toggleSection("pendingVerifications")}
        >
          <div className="flex items-center">
            <h3 className="font-semibold">Pending Verifications</h3>

          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`transition-transform ${
              expandedSections.pendingVerifications ? "rotate-180" : ""
            }`}
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>
        {!expandedSections.pendingVerifications && (
          <div className="px-4 pb-2 text-sm text-gray-600">
            Click the arrow to show or hide your verification requests.
          </div>
        )}

        {expandedSections.pendingVerifications && (
          <div className="px-4 pb-4">
            <div className="overflow-x-auto">
              <table className="min-w-full bg-blue-50 rounded-lg overflow-hidden">
                <thead className="bg-blue-500 text-white">
                  <tr>
                    <th className="py-2 px-4 text-left">Document</th>
                    <th className="py-2 px-4 text-left">Request #</th>
                    <th className="py-2 px-4 text-left">Date</th>
                    <th className="py-2 px-4 text-left">Status</th>
                    <th className="py-2 px-4 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentPage.pendingVerifications === 1 && (
                    <>
                      <tr className="border-b border-blue-100">
                        <td className="py-2 px-4">ID Card</td>
                        <td className="py-2 px-4">Request 1</td>
                        <td className="py-2 px-4">01-05-2023</td>
                        <td className="py-2 px-4">Pending</td>
                        <td className="py-2 px-4">
                          <div className="flex space-x-2">
                            <button className="bg-green-500 text-white px-2 py-1 rounded text-xs">
                              Approve
                            </button>
                            <button className="bg-red-500 text-white px-2 py-1 rounded text-xs">
                              Reject
                            </button>
                          </div>
                        </td>
                      </tr>
                      <tr className="border-b border-blue-100">
                        <td className="py-2 px-4">License</td>
                        <td className="py-2 px-4">Request 2</td>
                        <td className="py-2 px-4">02-05-2023</td>
                        <td className="py-2 px-4">Pending</td>
                        <td className="py-2 px-4">
                          <div className="flex space-x-2">
                            <button className="bg-green-500 text-white px-2 py-1 rounded text-xs">
                              Approve
                            </button>
                            <button className="bg-red-500 text-white px-2 py-1 rounded text-xs">
                              Reject
                            </button>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4">Certificate</td>
                        <td className="py-2 px-4">Request 3</td>
                        <td className="py-2 px-4">03-05-2023</td>
                        <td className="py-2 px-4">Pending</td>
                        <td className="py-2 px-4">
                          <div className="flex space-x-2">
                            <button className="bg-green-500 text-white px-2 py-1 rounded text-xs">
                              Approve
                            </button>
                            <button className="bg-red-500 text-white px-2 py-1 rounded text-xs">
                              Reject
                            </button>
                          </div>
                        </td>
                      </tr>
                    </>
                  )}
                  {currentPage.pendingVerifications === 2 && (
                    <>
                      <tr className="border-b border-blue-100">
                        <td className="py-2 px-4">Passport</td>
                        <td className="py-2 px-4">Request 4</td>
                        <td className="py-2 px-4">04-05-2023</td>
                        <td className="py-2 px-4">Pending</td>
                        <td className="py-2 px-4">
                          <div className="flex space-x-2">
                            <button className="bg-green-500 text-white px-2 py-1 rounded text-xs">
                              Approve
                            </button>
                            <button className="bg-red-500 text-white px-2 py-1 rounded text-xs">
                              Reject
                            </button>
                          </div>
                        </td>
                      </tr>
                    </>
                  )}
                </tbody>
              </table>
            </div>
            <div className="flex justify-center mt-4 space-x-1">
              <button
                className={`w-8 h-8 rounded-full ${
                  currentPage.pendingVerifications === 1
                    ? "bg-blue-100"
                    : "bg-white border"
                } flex items-center justify-center`}
                onClick={() => handlePageChange("pendingVerifications", 1)}
              >
                1
              </button>
              <button
                className={`w-8 h-8 rounded-full ${
                  currentPage.pendingVerifications === 2
                    ? "bg-blue-100"
                    : "bg-white border"
                } flex items-center justify-center`}
                onClick={() => handlePageChange("pendingVerifications", 2)}
              >
                2
              </button>
              <button
                className={`w-8 h-8 rounded-full ${
                  currentPage.pendingVerifications === 3
                    ? "bg-blue-100"
                    : "bg-white border"
                } flex items-center justify-center`}
                onClick={() => handlePageChange("pendingVerifications", 3)}
              >
                3
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Login History Section */}
      <div className="bg-white rounded-lg border overflow-hidden">
        <div
          className="p-4 flex justify-between items-center cursor-pointer"
          onClick={() => toggleSection("loginHistory")}
        >
          <div className="flex items-center">
            <h3 className="font-semibold">Login History</h3>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`transition-transform ${
              expandedSections.loginHistory ? "rotate-180" : ""
            }`}
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>
        {!expandedSections.loginHistory && (
          <div className="px-4 pb-2 text-sm text-gray-600">
            Click the arrow to show or hide your login and logout activity
            history.
          </div>
        )}

        {expandedSections.loginHistory && (
          <div className="px-4 pb-4">
            <div className="overflow-x-auto">
              <table className="min-w-full bg-blue-50 rounded-lg overflow-hidden">
                <thead className="bg-blue-500 text-white">
                  <tr>
                    <th className="py-2 px-4 text-left">Session</th>
                    <th className="py-2 px-4 text-left">Date/Time</th>
                    <th className="py-2 px-4 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {currentPage.loginHistory === 1 && (
                    <>
                      <tr className="border-b border-blue-100">
                        <td className="py-2 px-4">Session 5</td>
                        <td className="py-2 px-4">30-04-2023 09:30 AM</td>
                        <td className="py-2 px-4 text-green-600">Active</td>
                      </tr>
                      <tr className="border-b border-blue-100">
                        <td className="py-2 px-4">Session 4</td>
                        <td className="py-2 px-4">29-04-2023 02:15 PM</td>
                        <td className="py-2 px-4 text-red-600">Closed</td>
                      </tr>
                      <tr className="border-b border-blue-100">
                        <td className="py-2 px-4">Session 3</td>
                        <td className="py-2 px-4">28-04-2023 10:45 AM</td>
                        <td className="py-2 px-4 text-red-600">Closed</td>
                      </tr>
                    </>
                  )}
                  {currentPage.loginHistory === 2 && (
                    <>
                      <tr className="border-b border-blue-100">
                        <td className="py-2 px-4">Session 2</td>
                        <td className="py-2 px-4">27-04-2023 03:20 PM</td>
                        <td className="py-2 px-4 text-red-600">Closed</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4">Session 1</td>
                        <td className="py-2 px-4">26-04-2023 08:10 AM</td>
                        <td className="py-2 px-4 text-red-600">Closed</td>
                      </tr>
                    </>
                  )}
                </tbody>
              </table>
            </div>
            <div className="flex justify-center mt-4 space-x-1">
              <button
                className={`w-8 h-8 rounded-full ${
                  currentPage.loginHistory === 1
                    ? "bg-blue-100"
                    : "bg-white border"
                } flex items-center justify-center`}
                onClick={() => handlePageChange("loginHistory", 1)}
              >
                1
              </button>
              <button
                className={`w-8 h-8 rounded-full ${
                  currentPage.loginHistory === 2
                    ? "bg-blue-100"
                    : "bg-white border"
                } flex items-center justify-center`}
                onClick={() => handlePageChange("loginHistory", 2)}
              >
                2
              </button>
              <button
                className={`w-8 h-8 rounded-full ${
                  currentPage.loginHistory === 3
                    ? "bg-blue-100"
                    : "bg-white border"
                } flex items-center justify-center`}
                onClick={() => handlePageChange("loginHistory", 3)}
              >
                3
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
