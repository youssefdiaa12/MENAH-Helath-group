import { useState } from "react";

const EBMTable = () => {
  const generateData = (count) => {
    return Array.from({ length: count }, (_, index) => ({
      id: index + 1,
      bottleNumber: "123",
      bottleId: "123",
      milkUsed: "123",
      milkDiscarded: "123",
      volume: "123",
    }));
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(7);

  // Generate 70 sample records (10 pages with 7 items each)
  const allData = generateData(70);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = allData.slice(indexOfFirstItem, indexOfLastItem);

  // Calculate total pages
  const totalPages = Math.ceil(allData.length / itemsPerPage);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Go to next page
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Go to previous page
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Generate page numbers for display
  const getPageNumbers = () => {
    const pageNumbers = [];

    // Logic to show limited page numbers with ellipsis
    if (totalPages <= 7) {
      // If 7 or fewer pages, show all
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Always show first page
      pageNumbers.push(1);

      // Calculate start and end of page numbers to show
      const startPage = Math.max(2, currentPage - 2);
      const endPage = Math.min(totalPages - 1, currentPage + 2);

      // Adjust to always show 5 page numbers (if possible)
      if (startPage > 2) {
        pageNumbers.push("...");
      }

      // Add middle pages
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }

      // Add ellipsis if needed
      if (endPage < totalPages - 1) {
        pageNumbers.push("...");
      }

      // Always show last page
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <div className="text-lg font-semibold">Baby Name</div>
        <div className="text-xl font-bold">Stored EBM Bottles Table</div>
        <div className="text-lg font-semibold">Baby MRN</div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        {/* Header */}

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-blue-500 text-white">
                <th className="py-2 px-4 text-left">Order</th>
                <th className="py-2 px-4 text-left">Unique ID</th>
                <th className="py-2 px-4 text-left">Expression Date</th>
                <th className="py-2 px-4 text-left">Delivery Date (mL)</th>
                <th className="py-2 px-4 text-left">Volume (mL)</th>

              </tr>
            </thead>
            <tbody>
              {currentItems.map((item) => (
                <tr key={item.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">{item.bottleNumber}</td>
                  <td className="py-3 px-4">{item.bottleId}</td>
                  <td className="py-3 px-4">{item.milkUsed}</td>
                  <td className="py-3 px-4">{item.milkDiscarded}</td>
                  <td className="py-3 px-4">{item.volume}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-center p-4">
          <nav className="flex items-center">
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className={`w-8 h-8 flex items-center justify-center rounded-full ${
                currentPage === 1
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
              aria-label="Previous page"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
                />
              </svg>
            </button>

            {getPageNumbers().map((number, index) => (
              <button
                key={index}
                onClick={() => number !== "..." && paginate(number)}
                className={`w-8 h-8 mx-1 flex items-center justify-center rounded-full ${
                  currentPage === number
                    ? "bg-blue-100 text-blue-700 font-medium"
                    : number === "..."
                    ? "text-gray-700 cursor-default"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {number}
              </button>
            ))}

            <button
              onClick={nextPage}
              disabled={currentPage === totalPages}
              className={`w-8 h-8 flex items-center justify-center rounded-full ${
                currentPage === totalPages
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
              aria-label="Next page"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                />
              </svg>
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default EBMTable;
