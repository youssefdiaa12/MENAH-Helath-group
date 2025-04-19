import React, { useEffect, useState } from 'react';

const AdminProfileView = () => {
  const [adminProfile, setAdminProfile] = useState(null);
  const [approvalHistory, setApprovalHistory] = useState([]);

  useEffect(() => {
    const profileData = JSON.parse(localStorage.getItem('adminProfile')) || { name: 'Admin Name', email: 'admin@example.com' };
    setAdminProfile(profileData);

    const history = JSON.parse(localStorage.getItem('approvedAdmins')) || [];
    setApprovalHistory(history);
  }, []);

  if (!adminProfile) {
    return <div>Loading...</div>;
  }

  return (
    // 🔴 Removed border here
    <div style={{ padding: '20px', margin: '20px' }}>
      <h2 style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '24px' }}>
        Admin Profile Information
      </h2>
      <div style={{ marginTop: '20px' }}>
        <p><strong>Name:</strong> {adminProfile.name}</p>
        <p><strong>Email:</strong> {adminProfile.email}</p>
      </div>

      <div style={{ marginTop: '20px' }}>
        <h4 style={{ fontWeight: 'bold', color: '#dc3545' }}>Approval/Rejection History</h4>
        {approvalHistory.length === 0 ? (
          <p>No approval/rejection actions found.</p>
        ) : (
          <ul>
            {approvalHistory.map((entry, index) => (
              <li key={index}>
                <strong>{entry.name}</strong> {entry.action} profile on {entry.timestamp}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AdminProfileView;