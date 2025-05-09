import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext"; // Adjust path as needed

const AdminHome = () => {
  const [stats, setStats] = useState({
    total_nurses: "0",
    total_parents: "0",
    total_babies: "0",
    pending_approvals: "0",
    total_success_verifications: "0",
    total_failed_verifications: "0",
  });
  const { token } = useAuth(); // Get token from context

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/admin/calculations",
          {
            headers: {
              Authorization: `Bearer ${token}`, // Add token to request
            },
          }
        );

        if (response.data.Status) {
          setStats({
            total_nurses: response.data.Data.total_nurses || "0",
            total_parents: response.data.Data.total_parents || "0",
            total_babies: response.data.Data.total_babies || "0",
            pending_approvals: response.data.Data.pending_approvals || "0",
            total_success_verifications:
              response.data.Data.total_success_verifications || "0",
            total_failed_verifications:
              response.data.Data.total_failed_verifications || "0",
          });
        }
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchStats();
  }, []); // Re-fetch when token changes

  return (
    <div className="p-6  min-h-screen">
      {/* Top Row Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Total Nurses Card */}
        <div className="bg-white rounded-lg shadow-sm p-6 flex justify-between items-center border">
          <div>
            <h3 className="text-sm text-gray-500 font-medium mb-1">
              Total Nurses
            </h3>
            <p className="text-3xl font-bold">{stats.total_nurses}</p>
          </div>
          <div className="w-16 h-16 flex-shrink-0">
            <img
              src="/icons/nurses-icon.png"
              alt="Nurses Icon"
              width={64}
              height={64}
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Total Parents Card */}
        <div className="bg-white rounded-lg shadow-sm p-6 flex justify-between items-center border">
          <div>
            <h3 className="text-sm text-gray-500 font-medium mb-1">
              Total Parents
            </h3>
            <p className="text-3xl font-bold">{stats.total_parents}</p>
          </div>
          <div className="w-16 h-16 flex-shrink-0">
            <img
              src="/icons/parents-icon.png"
              alt="Parents Icon"
              width={64}
              height={64}
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Total Babies Card */}
        <div className="bg-white rounded-lg shadow-sm p-6 flex justify-between items-center border">
          <div>
            <h3 className="text-sm text-gray-500 font-medium mb-1">
              Total Babies
            </h3>
            <p className="text-3xl font-bold">{stats.total_babies}</p>
          </div>
          <div className="w-16 h-16 flex-shrink-0">
            <img
              src="/icons/baby-icon.png"
              alt="Baby Icon"
              width={64}
              height={64}
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </div>

      {/* Bottom Row Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Pending Approvals Card */}
        <div className="bg-white rounded-lg shadow-sm p-6 flex justify-between items-center border">
          <div>
            <h3 className="text-sm text-gray-500 font-medium mb-1">
              Pending Approvals
            </h3>
            <p className="text-3xl font-bold">{stats.pending_approvals}</p>
          </div>
          <div className="w-16 h-16 flex-shrink-0">
            <img
              src="/icons/clock-icon.png"
              alt="Clock Icon"
              width={64}
              height={64}
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Total Successful Verification Card */}
        <div className="bg-white rounded-lg shadow-sm p-6 flex justify-between items-center border">
          <div>
            <h3 className="text-sm text-gray-500 font-medium mb-1">
              Total Successful Verification
            </h3>
            <p className="text-3xl font-bold">
              {stats.total_success_verifications}
            </p>
          </div>
          <div className="w-16 h-16 flex-shrink-0">
            <img
              src="/icons/successful-verification-icon.png"
              alt="Successful Verification Icon"
              width={64}
              height={64}
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Total Failed Verifications Card */}
        <div className="bg-white rounded-lg shadow-sm p-6 flex justify-between items-center border">
          <div>
            <h3 className="text-sm text-gray-500 font-medium mb-1">
              Total Failed Verifications
            </h3>
            <p className="text-3xl font-bold">
              {stats.total_failed_verifications}
            </p>
          </div>
          <div className="w-16 h-16 flex-shrink-0">
            <img
              src="/icons/failed-verification-icon.png"
              alt="Failed Verification Icon"
              width={64}
              height={64}
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
