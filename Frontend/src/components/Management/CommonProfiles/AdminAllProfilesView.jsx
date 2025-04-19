// C:\Users\yahya\Halebi\src\components\Management\Admin\AdminAllProfilesView.jsx

import React, { useEffect, useState } from 'react';

const AdminAllProfilesView = () => {
  const [admins, setAdmins] = useState([]);
  const [nurses, setNurses] = useState([]);
  const [parents, setParents] = useState([]);

  useEffect(() => {
    const adminProfiles = JSON.parse(localStorage.getItem('adminProfiles')) || [];
    const nurseProfiles = JSON.parse(localStorage.getItem('nurseProfiles')) || [];
    const parentProfiles = JSON.parse(localStorage.getItem('parentProfiles')) || [];

    setAdmins(adminProfiles);
    setNurses(nurseProfiles);
    setParents(parentProfiles);
  }, []);

  const deleteProfile = (profileType, index) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this profile?');

    if (confirmDelete) {
      let updatedProfiles;
      if (profileType === 'admin') {
        updatedProfiles = admins.filter((_, i) => i !== index);
        localStorage.setItem('adminProfiles', JSON.stringify(updatedProfiles));
        setAdmins(updatedProfiles);
      } else if (profileType === 'nurse') {
        updatedProfiles = nurses.filter((_, i) => i !== index);
        localStorage.setItem('nurseProfiles', JSON.stringify(updatedProfiles));
        setNurses(updatedProfiles);
      } else if (profileType === 'parent') {
        updatedProfiles = parents.filter((_, i) => i !== index);
        localStorage.setItem('parentProfiles', JSON.stringify(updatedProfiles));
        setParents(updatedProfiles);
      }
    }
  };

  return (
    <div style={{ padding: '20px', border: '2px solid #ccc', borderRadius: '10px' }}>
      <h3 style={{ fontWeight: 'bold', color: '#333' }}>View All User Profiles</h3>

      {/* Admin Profiles */}
      <div style={{ marginBottom: '30px' }}>
        <h4 style={{ color: '#007bff' }}>Admin Profiles</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {admins.length > 0 ? (
            admins.map((admin, idx) => (
              <div
                key={idx}
                style={{
                  padding: '10px',
                  border: '1px solid #007bff',
                  borderRadius: '8px',
                  backgroundColor: '#f9f9f9'
                }}
              >
                <img
                  src={admin.profilePicture}
                  alt="Profile"
                  style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    border: '2px solid #333',
                    marginBottom: '10px'
                  }}
                />
                <p><strong>First Name:</strong> {admin.firstName}</p>
                <p><strong>Last Name:</strong> {admin.lastName}</p>
                <p><strong>Email:</strong> {admin.email}</p>
                <p><strong>Username:</strong> {admin.username}</p>
                <p><strong>Date of Joining:</strong> {admin.dateOfJoining}</p>
                <button
                  onClick={() => deleteProfile('admin', idx)}
                  style={{
                    padding: '5px 10px',
                    backgroundColor: '#dc3545',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  Delete
                </button>
              </div>
            ))
          ) : (
            <p>No admin profiles available.</p>
          )}
        </div>
      </div>

      {/* Nurse Profiles */}
      <div style={{ marginBottom: '30px' }}>
        <h4 style={{ color: '#28a745' }}>Nurse Profiles</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {nurses.length > 0 ? (
            nurses.map((nurse, idx) => (
              <div
                key={idx}
                style={{
                  padding: '10px',
                  border: '1px solid #28a745',
                  borderRadius: '8px',
                  backgroundColor: '#f9f9f9'
                }}
              >
                <img
                  src={nurse.profilePicture}
                  alt="Profile"
                  style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    border: '2px solid #333',
                    marginBottom: '10px'
                  }}
                />
                <p><strong>First Name:</strong> {nurse.firstName}</p>
                <p><strong>Last Name:</strong> {nurse.lastName}</p>
                <p><strong>Email:</strong> {nurse.email}</p>
                <p><strong>Username:</strong> {nurse.username}</p>
                <p><strong>Date of Joining:</strong> {nurse.dateOfJoining}</p>
                <button
                  onClick={() => deleteProfile('nurse', idx)}
                  style={{
                    padding: '5px 10px',
                    backgroundColor: '#dc3545',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  Delete
                </button>
              </div>
            ))
          ) : (
            <p>No nurse profiles available.</p>
          )}
        </div>
      </div>

      {/* Parent Profiles */}
      <div>
        <h4 style={{ color: '#dc3545' }}>Parent Profiles</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {parents.length > 0 ? (
            parents.map((parent, idx) => (
              <div
                key={idx}
                style={{
                  padding: '10px',
                  border: '1px solid #dc3545',
                  borderRadius: '8px',
                  backgroundColor: '#f9f9f9'
                }}
              >
                <img
                  src={parent.profilePicture}
                  alt="Profile"
                  style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    border: '2px solid #333',
                    marginBottom: '10px'
                  }}
                />
                <p><strong>First Name:</strong> {parent.firstName}</p>
                <p><strong>Last Name:</strong> {parent.lastName}</p>
                <p><strong>Email:</strong> {parent.email}</p>
                <p><strong>Username:</strong> {parent.username}</p>
                <p><strong>Date of Joining:</strong> {parent.dateOfJoining}</p>
                <button
                  onClick={() => deleteProfile('parent', idx)}
                  style={{
                    padding: '5px 10px',
                    backgroundColor: '#dc3545',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  Delete
                </button>
              </div>
            ))
          ) : (
            <p>No parent profiles available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminAllProfilesView;
