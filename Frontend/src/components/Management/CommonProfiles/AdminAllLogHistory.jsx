// C:\Users\yahya\Halebi\src\components\Management\Admin\AdminAllLogHistory.jsx

import React, { useEffect, useState } from 'react';

const AdminAllLogHistory = () => {
  const [adminLoginHistory, setAdminLoginHistory] = useState([]);
  const [adminLogoutHistory, setAdminLogoutHistory] = useState([]);
  const [nurseLoginHistory, setNurseLoginHistory] = useState([]);
  const [nurseLogoutHistory, setNurseLogoutHistory] = useState([]);
  const [parentLoginHistory, setParentLoginHistory] = useState([]);
  const [parentLogoutHistory, setParentLogoutHistory] = useState([]);

  useEffect(() => {
    setAdminLoginHistory(JSON.parse(localStorage.getItem('adminLoginHistory')) || []);
    setAdminLogoutHistory(JSON.parse(localStorage.getItem('adminLogoutHistory')) || []);
    setNurseLoginHistory(JSON.parse(localStorage.getItem('nurseLoginHistory')) || []);
    setNurseLogoutHistory(JSON.parse(localStorage.getItem('nurseLogoutHistory')) || []);
    setParentLoginHistory(JSON.parse(localStorage.getItem('parentLoginHistory')) || []);
    setParentLogoutHistory(JSON.parse(localStorage.getItem('parentLogoutHistory')) || []);
  }, []);

  return (
    <div style={{ marginTop: '30px', padding: '20px', border: '2px solid #ccc', borderRadius: '10px' }}>
      <h3 style={{ fontWeight: 'bold', color: '#333' }}>View Login & Logout History of All Users</h3>

      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '50px' }}>
        {/* Admin Log History */}
        <div style={{ border: '2px solid #007bff', borderRadius: '8px', padding: '10px', width: '45%' }}>
          <h4 style={{ color: '#007bff' }}>Admin Login Times</h4>
          <ul>
            {adminLoginHistory.length > 0 ? (
              adminLoginHistory.map((entry, idx) => <li key={idx}>{entry}</li>)
            ) : (
              <li>No login records for admins.</li>
            )}
          </ul>
          <h4 style={{ color: '#007bff' }}>Admin Logout Times</h4>
          <ul>
            {adminLogoutHistory.length > 0 ? (
              adminLogoutHistory.map((entry, idx) => <li key={idx}>{entry}</li>)
            ) : (
              <li>No logout records for admins.</li>
            )}
          </ul>
        </div>

        {/* Nurse Log History */}
        <div style={{ border: '2px solid #28a745', borderRadius: '8px', padding: '10px', width: '45%' }}>
          <h4 style={{ color: '#28a745' }}>Nurse Login Times</h4>
          <ul>
            {nurseLoginHistory.length > 0 ? (
              nurseLoginHistory.map((entry, idx) => <li key={idx}>{entry}</li>)
            ) : (
              <li>No login records for nurses.</li>
            )}
          </ul>
          <h4 style={{ color: '#28a745' }}>Nurse Logout Times</h4>
          <ul>
            {nurseLogoutHistory.length > 0 ? (
              nurseLogoutHistory.map((entry, idx) => <li key={idx}>{entry}</li>)
            ) : (
              <li>No logout records for nurses.</li>
            )}
          </ul>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '50px' }}>
        {/* Parent Log History */}
        <div style={{ border: '2px solid #dc3545', borderRadius: '8px', padding: '10px', width: '45%' }}>
          <h4 style={{ color: '#dc3545' }}>Parent Login Times</h4>
          <ul>
            {parentLoginHistory.length > 0 ? (
              parentLoginHistory.map((entry, idx) => <li key={idx}>{entry}</li>)
            ) : (
              <li>No login records for parents.</li>
            )}
          </ul>
          <h4 style={{ color: '#dc3545' }}>Parent Logout Times</h4>
          <ul>
            {parentLogoutHistory.length > 0 ? (
              parentLogoutHistory.map((entry, idx) => <li key={idx}>{entry}</li>)
            ) : (
              <li>No logout records for parents.</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminAllLogHistory;
