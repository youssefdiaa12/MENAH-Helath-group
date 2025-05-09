"use client";
import { useEffect, useState } from "react";
import axios from "axios";

const Baby = () => {
  const [babies, setBabies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBabies = async () => {
      try {
        const token = localStorage.getItem("token"); // Get token from localStorage
        const response = await axios.post(
          "http://localhost:8080/parent/babies",
          {
            page: 1,
            username: JSON.parse(atob(token.split(".")[1])).username, // Decode JWT to get username
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.Status) {
          setBabies(response.data.Data);
        } else {
          setError(response.data.Message);
        }
      } catch (err) {
        setError("Failed to fetch babies data");
        console.error("Error fetching babies:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBabies();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto p-4">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-8">Baby Information</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {babies.map((baby, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-800">
                    {baby.name_en}
                  </h2>
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      baby.gender.toLowerCase() === "male"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-pink-100 text-pink-800"
                    }`}
                  >
                    {baby.gender}
                  </span>
                </div>

                <div className="border-t border-gray-200 pt-4 space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">MRN:</span>
                    <span className="font-medium">{baby.mrn}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">Date of Birth:</span>
                    <span className="font-medium">
                      {new Date(baby.date_of_birth).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">Days of Life:</span>
                    <span className="font-medium">
                      {baby.days_of_life} days
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">Birth Weight:</span>
                    <span className="font-medium">{baby.birth_weight}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">Gestational Age:</span>
                    <span className="font-medium">
                      {baby.gestationalage_days} days
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">Birth Certificate:</span>
                    <span className="font-medium">
                      {baby.birth_certificate_id}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Baby;
