"use client";

import { useState, useEffect } from "react";
import axios from "axios";

const BabyTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [bottles, setBottles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [summary, setSummary] = useState(null);

  // Fetch EBM data
  const fetchEBMData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:8080/parent/EBM",
        {
          page: currentPage,
          username: JSON.parse(atob(token.split(".")[1])).username,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.Status) {
        setBottles(response.data.Data.data);
      } else {
        setError(response.data.Message);
      }
    } catch (err) {
      setError("Failed to fetch EBM data");
      console.error("Error fetching EBM:", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch summary calculations
  const fetchCalculations = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:8080/parent/calculations",
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
        setSummary(response.data.Data);
      }
    } catch (err) {
      console.error("Error fetching calculations:", err);
    }
  };

  useEffect(() => {
    fetchEBMData();
    fetchCalculations();
  }, [currentPage]);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
    <div className="p-4">
      <h1 className="text-xl font-semibold text-center mb-16 mt-6">
        EBM Table
      </h1>

      {/* EBM Table */}
      <div className="overflow-x-auto mb-6">
        <table className="min-w-full">
          <thead>
            <tr className="bg-blue-500 text-white">
              <th className="py-3 px-4 text-left">Order #</th>
              <th className="py-3 px-4 text-left">Expression Date</th>
              <th className="py-3 px-4 text-left">Delivery Date</th>
              <th className="py-3 px-4 text-left">Volume (ml)</th>
            </tr>
          </thead>
          <tbody>
            {bottles.map((bottle) => (
              <tr
                key={bottle.order_number}
                className="border-b border-gray-200"
              >
                <td className="py-3 px-4">{bottle.order_number}</td>
                <td className="py-3 px-4">
                  {new Date(bottle.date_of_expression).toLocaleDateString()}
                </td>
                <td className="py-3 px-4">
                  {new Date(bottle.date_of_delivery).toLocaleDateString()}
                </td>
                <td className="py-3 px-4">{bottle.volume}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mb-6">
        <nav className="flex items-center space-x-1">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            &lt;
          </button>

          <button
            onClick={() => paginate(currentPage)}
            className="px-3 py-1 bg-blue-500 text-white rounded"
          >
            {currentPage}
          </button>

          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={!bottles.length}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            &gt;
          </button>
        </nav>
      </div>

      {/* Summary Section */}
      {summary && (
        <div className="bg-white rounded-lg border border-gray-300 p-6 mt-20">
          <div className="space-y-3">
            <div>
              <span className="font-semibold">Total number of bottles: </span>
              <span>{summary.number_bottles}</span>
            </div>

            <div>
              <span className="font-semibold">Total Volume Available: </span>
              <span>{summary.total_volume_available} ml</span>
            </div>

            <div>
              <span className="font-semibold">Total Bottles Used: </span>
              <span>{summary.total_bottles_used}</span>
            </div>

            <div>
              <span className="font-semibold">Total Bottles Finished: </span>
              <span>{summary.total_bottles_finished}</span>
            </div>

            <div>
              <span className="font-semibold">Total Volume Used: </span>
              <span>{summary.total_volume_used || "0"} ml</span>
            </div>

            <div>
              <span className="font-semibold">Total Volume Discarded: </span>
              <span>{summary.total_volume_discarded || "0"} ml</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BabyTable;
