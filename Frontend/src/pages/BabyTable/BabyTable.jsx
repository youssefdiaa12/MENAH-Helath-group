"use client";

import { useState } from "react";

// Mock data for EBM bottles
const generateMockData = () => {
  const data = [];
  for (let i = 1; i <= 50; i++) {
    data.push({
      id: i,
      bottleNumber: `B-${100 + i}`,
      uniqueNumber: `UN-${200 + i}`,
      expressionDate: `${Math.floor(Math.random() * 30) + 1}/04/2025`,
      deliveryDate: `${Math.floor(Math.random() * 30) + 1}/04/2025`,
      dateUsed: `${Math.floor(Math.random() * 30) + 1}/04/2025`,
      volume: Math.floor(Math.random() * 100) + 50,
    });
  }
  return data;
};

const BabyTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [bottles] = useState(generateMockData());
  const bottlesPerPage = 8;

  // Get current bottles for pagination
  const indexOfLastBottle = currentPage * bottlesPerPage;
  const indexOfFirstBottle = indexOfLastBottle - bottlesPerPage;
  const currentBottles = bottles.slice(indexOfFirstBottle, indexOfLastBottle);
  const totalPages = Math.ceil(bottles.length / bottlesPerPage);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calculate summary statistics
  const totalBottles = bottles.length;
  const totalVolumeStored = bottles.reduce(
    (sum, bottle) => sum + bottle.volume,
    0
  );
  const totalBottlesUsed = Math.floor(totalBottles * 0.8); // 80% of bottles used for demo
  const totalVolumeUsed = Math.floor(totalVolumeStored * 0.8); // 80% of volume used for demo
  const totalVolumeDiscarded = totalVolumeStored - totalVolumeUsed;

  return (
    <div className=" p-4">
      <h1 className="text-xl font-semibold text-center mb-16 mt-6">EBM Table</h1>

      {/* EBM Table */}
      <div className="overflow-x-auto mb-6">
        <table className="min-w-full">
          <thead>
            <tr className="bg-blue-500 text-white">
              <th className="py-3 px-4 text-left">Bottle #</th>
              <th className="py-3 px-4 text-left">Unique Number</th>
              <th className="py-3 px-4 text-left">Expression Date</th>
              <th className="py-3 px-4 text-left">Delivery Date</th>
              <th className="py-3 px-4 text-left">Date Used</th>
              <th className="py-3 px-4 text-left">Volume (ml)</th>
            </tr>
          </thead>
          <tbody>
            {currentBottles.map((bottle) => (
              <tr key={bottle.id} className="border-b border-gray-200">
                <td className="py-3 px-4">{bottle.bottleNumber}</td>
                <td className="py-3 px-4">{bottle.uniqueNumber}</td>
                <td className="py-3 px-4">{bottle.expressionDate}</td>
                <td className="py-3 px-4">{bottle.deliveryDate}</td>
                <td className="py-3 px-4">{bottle.dateUsed}</td>
                <td className="py-3 px-4">{bottle.volume}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
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

          {/* Dynamic pagination */}
          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter((page) => {
              if (
                page === 1 ||
                page === totalPages ||
                (page >= currentPage - 1 && page <= currentPage + 1)
              ) {
                return true;
              }
              return false;
            })
            .reduce((acc, page, index, array) => {
              if (index > 0 && page - array[index - 1] > 1) {
                acc.push("...");
              }
              acc.push(page);
              return acc;
            }, [])
            .map((page, i) =>
              page === "..." ? (
                <span key={i} className="px-3 py-1 text-gray-500">
                  ...
                </span>
              ) : (
                <button
                  key={i}
                  onClick={() => paginate(page)}
                  className={`px-3 py-1 ${
                    currentPage === page
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200"
                  } rounded`}
                >
                  {page}
                </button>
              )
            )}

          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            &gt;
          </button>
        </nav>
      </div>

      {/* Summary Section */}
      <div className="bg-white rounded-lg border border-gray-300 p-6 mt-20">
        <div className="space-y-3">
          <div>
            <span className="font-semibold">Total number of bottles: </span>
            <span>{totalBottles}</span>
          </div>

          <div>
            <span className="font-semibold">Total Volume Stored: </span>
            <span>{totalVolumeStored.toLocaleString()} ml</span>
          </div>

          <div>
            <span className="font-semibold">Total Bottles Used: </span>
            <span>{totalBottlesUsed}</span>
          </div>

          <div>
            <span className="font-semibold">Total Volume Used: </span>
            <span>{totalVolumeUsed.toLocaleString()} ml</span>
          </div>

          <div>
            <span className="font-semibold">Total Volume Discarded: </span>
            <span>{totalVolumeDiscarded.toLocaleString()} ml</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BabyTable;
