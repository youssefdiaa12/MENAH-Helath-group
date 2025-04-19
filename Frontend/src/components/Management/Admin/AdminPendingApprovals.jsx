import React, { useEffect, useState } from 'react';

const AdminPendingApprovals = () => {
  const [pendingProfiles, setPendingProfiles] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('pendingProfiles')) || [];
    setPendingProfiles(stored);
  }, []);

  const approveProfile = (index) => {
    const profile = pendingProfiles[index];
    const { type, data } = profile;

    // Determine where to save
    const key =
      type === 'admin' ? 'adminProfiles' :
      type === 'nurse' ? 'nurseProfiles' :
      'parentProfiles';

    const existing = JSON.parse(localStorage.getItem(key)) || [];
    existing.push(data);
    localStorage.setItem(key, JSON.stringify(existing));

    // Remove from pending list
    const updated = [...pendingProfiles];
    updated.splice(index, 1);
    localStorage.setItem('pendingProfiles', JSON.stringify(updated));
    setPendingProfiles(updated);

    // Log the approval action
    const approvalHistory = JSON.parse(localStorage.getItem('approvedAdmins')) || [];
    approvalHistory.push({
      name: data.firstName + " " + data.lastName,
      action: 'approved',
      timestamp: new Date().toLocaleString(),
    });
    localStorage.setItem('approvedAdmins', JSON.stringify(approvalHistory));
  };

  const rejectProfile = (index) => {
    const updated = [...pendingProfiles];
    updated.splice(index, 1);
    localStorage.setItem('pendingProfiles', JSON.stringify(updated));
    setPendingProfiles(updated);

    // Log the rejection action
    const approvalHistory = JSON.parse(localStorage.getItem('approvedAdmins')) || [];
    approvalHistory.push({
      name: pendingProfiles[index].data.firstName + " " + pendingProfiles[index].data.lastName,
      action: 'rejected',
      timestamp: new Date().toLocaleString(),
    });
    localStorage.setItem('approvedAdmins', JSON.stringify(approvalHistory));
  };

  return (
    <div style={{ padding: '20px', marginTop: '20px', borderTop: '2px solid black' }}>
      <h3 style={{ fontWeight: 'bold', color: '#dc3545' }}>Pending Profile Approvals</h3>

      {pendingProfiles.length === 0 ? (
        <p>No pending profiles.</p>
      ) : (
        pendingProfiles.map((profile, index) => (
          <div
            key={index}
            style={{
              marginBottom: '15px',
              padding: '10px',
              border: '1px solid gray',
              borderRadius: '8px',
              backgroundColor: '#f9f9f9'
            }}
          >
            <p><strong>Type:</strong> {profile.type}</p>
            <p><strong>Name:</strong> {profile.data.firstName} {profile.data.lastName}</p>
            <p><strong>Email:</strong> {profile.data.email}</p>
            <p><strong>Username:</strong> {profile.data.username}</p>

            <button
              onClick={() => approveProfile(index)}
              style={{
                padding: '5px 15px',
                marginRight: '10px',
                backgroundColor: '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Approve
            </button>

            <button
              onClick={() => rejectProfile(index)}
              style={{
                padding: '5px 15px',
                backgroundColor: '#dc3545',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Reject
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default AdminPendingApprovals;
