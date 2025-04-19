// C:\Users\yahya\Halebi\src\components\Management\Nurses\NurseLogHistory.jsx

import React, { useEffect, useState } from 'react';

const NurseLogHistory = () => {
  const [loginHistory, setLoginHistory] = useState([]);
  const [logoutHistory, setLogoutHistory] = useState([]);

  useEffect(() => {
    const logins = JSON.parse(localStorage.getItem('nurseLoginHistory')) || [];
    const logouts = JSON.parse(localStorage.getItem('nurseLogoutHistory')) || [];
    setLoginHistory(logins);
    setLogoutHistory(logouts);
  }, []);

  return (
    <div style={{ marginTop: '30px' }}>
      <h3 style={{ fontWeight: 'bold', color: '#333' }}>My Login & Logout History</h3>

      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '50px' }}>
        <div>
          <h4 style={{ color: '#28a745' }}>Login Times</h4>
          <ul>
            {loginHistory.length > 0 ? (
              loginHistory.map((entry, idx) => <li key={idx}>{entry}</li>)
            ) : (
              <li>No login records.</li>
            )}
          </ul>
        </div>

        <div>
          <h4 style={{ color: '#dc3545' }}>Logout Times</h4>
          <ul>
            {logoutHistory.length > 0 ? (
              logoutHistory.map((entry, idx) => <li key={idx}>{entry}</li>)
            ) : (
              <li>No logout records.</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NurseLogHistory;
