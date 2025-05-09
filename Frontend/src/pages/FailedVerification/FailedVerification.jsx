import { useState, useEffect } from "react";

// Mock verification data
const mockVerifications = [
  {
    date: "27/04/2025",
    nurseId: "salma.y",
    bottleId: "BTL-1234",
    mrn: "MRN-00123",
    method: "Face Photo",
  },
  {
    date: "27/04/2025",
    nurseId: "mariam.n",
    bottleId: "BTL-5678",
    mrn: "MRN-00456",
    method: "Footprint",
  },
  {
    date: "28/04/2025",
    nurseId: "abeer.k",
    bottleId: "BTL-7890",
    mrn: "MRN-00987",
    method: "Retina Print",
  },
  {
    date: "28/04/2025",
    nurseId: "nour.h",
    bottleId: "BTL-8823",
    mrn: "MRN-00234",
    method: "Retina Print",
  },
  {
    date: "29/04/2025",
    nurseId: "dina.f",
    bottleId: "BTL-9931",
    mrn: "MRN-00512",
    method: "Footprint",
  },
  {
    date: "29/04/2025",
    nurseId: "dina.f",
    bottleId: "BTL-9931",
    mrn: "MRN-00512",
    method: "Footprint",
  },
  {
    date: "29/04/2025",
    nurseId: "dina.f",
    bottleId: "BTL-9931",
    mrn: "MRN-00512",
    method: "Footprint",
  }
  ,
  {
    date: "29/04/2025",
    nurseId: "dina.f",
    bottleId: "BTL-9931",
    mrn: "MRN-00512",
    method: "Footprint",
  }
  ,
  {
    date: "29/04/2025",
    nurseId: "dina.f",
    bottleId: "BTL-9931",
    mrn: "MRN-00512",
    method: "Footprint",
  }
  ,
  {
    date: "29/04/2025",
    nurseId: "dina.f",
    bottleId: "BTL-9931",
    mrn: "MRN-00512",
    method: "Footprint",
  }
  ,
  {
    date: "29/04/2025",
    nurseId: "dina.f",
    bottleId: "BTL-9931",
    mrn: "MRN-00512",
    method: "Footprint",
  }
];

const FailedVerification = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [verifications, setVerifications] = useState(mockVerifications);
  const [filteredVerifications, setFilteredVerifications] = useState([]);
  const itemsPerPage = 5;

  useEffect(() => {
    const results = verifications.filter((item) =>
      item.nurseId.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredVerifications(results);
    setCurrentPage(1);
  }, [searchTerm, verifications]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredVerifications.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredVerifications.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl text-[#595959]">Total: {verifications.length}</h1>
        <div className="flex items-center space-x-2">
          <label htmlFor="search" className="text-[#595959]">Search</label>
          <input
            type="text"
            id="search"
            placeholder="Nurse ID"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-3 pr-10 py-2 border border-gray-300 rounded-md w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-xl font-semibold mb-2">Failed Verifications</h2>
        <p className="text-gray-600 mb-6">
          This table shows all Failed milk verification attempts performed by nurses.
        </p>

        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-blue-500 text-white">
                <th className="py-3 px-4 text-left">Date</th>
                <th className="py-3 px-4 text-left">Nurse ID</th>
                <th className="py-3 px-4 text-left">Bottle ID</th>
                <th className="py-3 px-4 text-left">MRN</th>
                <th className="py-3 px-4 text-left">Method</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.length > 0 ? (
                currentItems.map((item, index) => (
                  <tr key={index} className="border-b border-gray-200">
                    <td className="py-3 px-4">{item.date}</td>
                    <td className="py-3 px-4">{item.nurseId}</td>
                    <td className="py-3 px-4">{item.bottleId}</td>
                    <td className="py-3 px-4">{item.mrn}</td>
                    <td className="py-3 px-4">{item.method}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="py-4 text-center text-gray-500">
                    No verifications found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {filteredVerifications.length > itemsPerPage && (
          <div className="flex justify-center mt-6">
            <nav className="flex items-center space-x-1">
              <button
                onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 font-bold bg-gray-200 rounded disabled:opacity-50"
              >
                &lt;
              </button>

              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => paginate(i + 1)}
                  className={`px-3 py-1 ${
                    currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-gray-200"
                  }`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                onClick={() =>
                  paginate(currentPage < totalPages ? currentPage + 1 : totalPages)
                }
                disabled={currentPage === totalPages}
                className="px-3 py-1 font-bold bg-gray-200 rounded disabled:opacity-50"
              >
                &gt;
              </button>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
};

export default FailedVerification;
