import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

const NurseProfiles = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [nurses, setNurses] = useState([]);
  const [filteredNurses, setFilteredNurses] = useState([]);
  const [totalNurses, setTotalNurses] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const nursesPerPage = 5;
  const { token } = useAuth();

  // Fetch nurses from the API
  const fetchNurses = async (page) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "http://localhost:8080/admin/unverifiedNurses",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
          },
          body: JSON.stringify({ page }),
        }
      );

      const result = await response.json();

      if (result.Status) {
        setNurses(result.Data.data);
        setFilteredNurses(result.Data.data);
        setTotalNurses(result.Data.total);
      } else {
        setError(result.Message || "Failed to fetch nurses");
      }
    } catch (err) {
      setError("Error connecting to the server");
      console.error("Error fetching nurses:", err);
    } finally {
      setLoading(false);
    }
  };

  // Initial data fetch and on page change
  useEffect(() => {
    fetchNurses(currentPage);
  }, [currentPage, token]);

  // Filter nurses based on search term
  useEffect(() => {
    if (nurses.length > 0) {
      const results = nurses.filter(
        (nurse) =>
          nurse.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          nurse.username.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredNurses(results);
    } else {
      setFilteredNurses([]);
    }
  }, [searchTerm, nurses]);

  // Calculate total pages
  const totalPages = Math.ceil(totalNurses / nursesPerPage);

  // Change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    // No need to call fetchNurses here, useEffect will handle it
  };

  // Handle approve/reject actions
  const handleApprove = async (username, phone) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("http://localhost:8080/admin/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify({ username, phone }),
      });
      const result = await response.json();
      if (result.Status) {
        fetchNurses(currentPage); // Refresh list
      } else {
        setError(result.Message || "Failed to approve nurse");
      }
    } catch (err) {
      setError("Error connecting to the server");
      console.error("Error approving nurse:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleReject = async (username, phone) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("http://localhost:8080/admin/UnVerify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify({ username, phone }),
      });
      const result = await response.json();
      if (result.Status) {
        fetchNurses(currentPage); // Refresh list
      } else {
        setError(result.Message || "Failed to reject nurse");
      }
    } catch (err) {
      setError("Error connecting to the server");
      console.error("Error rejecting nurse:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      {/* Search Bar */}
      <div className="mb-6 flex items-center space-x-2">
        <label htmlFor="search" className="block text-xl text-[#595959] mb-1">
          Search
        </label>
        <div className="relative">
          <input
            type="text"
            id="search"
            placeholder="Username"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-3 pr-10 py-2 border border-gray-300 placeholder:text-[#cecece] rounded-md w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Nurse Profile Card */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-xl font-semibold mb-2">Nurse Profile Approval</h2>
        <p className="text-gray-600 mb-6">
          Review and approve or reject pending nurse accounts below.
        </p>

        {/* Loading and Error States */}
        {loading && <div className="text-center py-4">Loading nurses...</div>}
        {error && <div className="text-center py-4 text-red-500">{error}</div>}

        {/* Table */}
        {!loading && !error && (
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-blue-500 text-white">
                  <th className="py-3 px-4 text-left rounded-tl-lg">Name</th>
                  <th className="py-3 px-4 text-left">Username</th>
                  <th className="py-3 px-4 text-left">Phone</th>
                  <th className="py-3 px-4 text-left rounded-tr-lg">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredNurses.length > 0 ? (
                  filteredNurses.map((nurse, index) => (
                    <tr key={index} className="border-b border-gray-200">
                      <td className="py-3 px-4">{nurse.name}</td>
                      <td className="py-3 px-4">{nurse.username}</td>
                      <td className="py-3 px-4">{nurse.mobile}</td>
                      <td className="py-3 px-4">
                        <div className="flex space-x-2">
                          <button
                            onClick={() =>
                              handleApprove(nurse.username, nurse.mobile)
                            }
                            className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md text-sm"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() =>
                              handleReject(nurse.username, nurse.mobile)
                            }
                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm"
                          >
                            Reject
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="py-4 text-center text-gray-500">
                      No nurses found matching your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 0 && !loading && (
          <div className="flex justify-center mt-6">
            <nav className="flex items-center">
              <button
                onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 bg-gray-200 rounded-l-md disabled:opacity-50"
              >
                &lt;
              </button>

              {/* Generate page buttons */}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (number) => (
                  <button
                    key={number}
                    onClick={() => paginate(number)}
                    className={`px-3 py-1 ${
                      currentPage === number
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200"
                    }`}
                  >
                    {number}
                  </button>
                )
              )}

              <button
                onClick={() =>
                  paginate(
                    currentPage < totalPages ? currentPage + 1 : totalPages
                  )
                }
                disabled={currentPage === totalPages}
                className="px-3 py-1 bg-gray-200 rounded-r-md disabled:opacity-50"
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

export default NurseProfiles;
