"use client";

import { useState, useEffect } from "react";
import axios from "axios";

const BabyProfile = () => {
  // State to track which sections are expanded
  const [expandedSections, setExpandedSections] = useState({
    loginHistory: false,
  });

  // State to track current page for login history
  const [currentPage, setCurrentPage] = useState({
    loginHistory: 1,
  });

  // State for user profile and login history
  const [userProfile, setUserProfile] = useState(null);
  const [loginHistory, setLoginHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user profile
  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:8080/all/profile",
        {
          username: JSON.parse(atob(token.split(".")[1])).username,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.Status) {
        setUserProfile(response.data.Data);
      } else {
        setError(response.data.Message);
      }
    } catch (err) {
      setError("Failed to fetch user profile");
      console.error("Error fetching profile:", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch login history
  const fetchLoginHistory = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:8080/all/history",
        {
          page: currentPage.loginHistory,
          username: JSON.parse(atob(token.split(".")[1])).username,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.Status) {
        setLoginHistory(response.data.Data.data);
      } else {
        setError(response.data.Message);
      }
    } catch (err) {
      setError("Failed to fetch login history");
      console.error("Error fetching history:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  useEffect(() => {
    if (expandedSections.loginHistory) {
      fetchLoginHistory();
    }
  }, [currentPage.loginHistory, expandedSections.loginHistory]);

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

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 p-4">
      {/* Profile Information Card */}
      {userProfile && (
        <div className="bg-white rounded-lg border p-6">
          <div className="flex items-center mb-6">
            <div>
              <h2 className="font-semibold text-lg">{`${userProfile.firstname} ${userProfile.lastname}`}</h2>
              <p
                className={`text-sm ${
                  userProfile.isactive ? "text-green-500" : "text-red-500"
                }`}
              >
                {userProfile.isactive ? "Active" : "Inactive"}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-1">
              <p className="text-sm text-gray-500">First Name</p>
              <div className="flex justify-between border p-2 rounded-md">
                <p>{userProfile.firstname}</p>
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
                <p>{userProfile.lastname}</p>
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
                <p>{userProfile.username}</p>
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
                <p>{userProfile.mobile}</p>
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
      )}

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
                    <th className="py-2 px-4 text-left">Date</th>
                    <th className="py-2 px-4 text-left">Time</th>
                    <th className="py-2 px-4 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {loginHistory.map((session) => (
                    <tr key={session.id} className="border-b border-blue-100">
                      <td className="py-2 px-4">Session {session.id}</td>
                      <td className="py-2 px-4">
                        {new Date(session.login_date).toLocaleDateString()}
                      </td>
                      <td className="py-2 px-4">{session.login_time}</td>
                      <td className="py-2 px-4 text-green-600">
                        {session.verification_result}
                      </td>
                    </tr>
                  ))}
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
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BabyProfile;
