import { useState } from "react";

const AdminProfile = () => {
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

export default AdminProfile;
