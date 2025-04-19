import React, { useState, useEffect } from 'react';

const AdminProfileCreation = () => {
  const [adminProfile, setAdminProfile] = useState({
    firstName: '',
    lastName: '',
    profilePicture: null,
    joiningDate: '',
    loginHistory: [],
  });

  // Load the admin profile from localStorage when the component mounts
  useEffect(() => {
    const savedProfile = localStorage.getItem('adminProfile');
    if (savedProfile) {
      setAdminProfile(JSON.parse(savedProfile));
    }
  }, []);

  // Save the admin profile to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('adminProfile', JSON.stringify(adminProfile));
  }, [adminProfile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdminProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handlePictureUpload = (e) => {
    const file = e.target.files[0];
    setAdminProfile((prev) => ({ ...prev, profilePicture: file }));
  };

  const handleSave = () => {
    if (!adminProfile.firstName || !adminProfile.lastName || !adminProfile.joiningDate) {
      alert('Please fill in all required fields.');
      return;
    }

    // Create a timestamp for login history
    const timestamp = new Date().toLocaleString();
    const updatedHistory = [...adminProfile.loginHistory, `Profile created on ${timestamp}`];
    setAdminProfile((prev) => ({ ...prev, loginHistory: updatedHistory }));

    // Save the profile as a pending approval profile
    const pendingProfiles = JSON.parse(localStorage.getItem('pendingProfiles')) || [];
    pendingProfiles.push({
      type: 'admin',
      data: adminProfile,
    });
    localStorage.setItem('pendingProfiles', JSON.stringify(pendingProfiles));

    alert('Profile submitted for approval.');
  };

  return (
    <div style={{ marginTop: '20px', padding: '20px', border: '1px solid gray' }}>
      <h3 style={{ fontWeight: 'bold' }}>Admin Profile</h3>

      <div style={{ marginBottom: '10px' }}>
        <label>First Name:</label>
        <input
          type="text"
          name="firstName"
          value={adminProfile.firstName}
          onChange={handleChange}
          style={{ marginLeft: '10px', padding: '5px' }}
        />
      </div>

      <div style={{ marginBottom: '10px' }}>
        <label>Last Name:</label>
        <input
          type="text"
          name="lastName"
          value={adminProfile.lastName}
          onChange={handleChange}
          style={{ marginLeft: '10px', padding: '5px' }}
        />
      </div>

      <div style={{ marginBottom: '10px' }}>
        <label>Date of Joining:</label>
        <input
          type="date"
          name="joiningDate"
          value={adminProfile.joiningDate}
          onChange={handleChange}
          style={{ marginLeft: '10px', padding: '5px' }}
        />
      </div>

      <div style={{ marginBottom: '10px' }}>
        <label>Upload Profile Picture:</label>
        <input
          type="file"
          accept="image/*"
          onChange={handlePictureUpload}
          style={{ marginLeft: '10px' }}
        />
      </div>

      <button onClick={handleSave} style={{ padding: '10px 20px', fontWeight: 'bold' }}>
        Submit for Approval
      </button>

      {adminProfile.loginHistory.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          <h4>Login History</h4>
          <ul>
            {adminProfile.loginHistory.map((entry, index) => (
              <li key={index}>{entry}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AdminProfileCreation;
