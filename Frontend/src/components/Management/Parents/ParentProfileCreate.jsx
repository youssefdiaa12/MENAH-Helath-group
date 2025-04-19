import React, { useState, useEffect } from 'react';

const ParentProfileCreate = () => {
  const [parentProfile, setParentProfile] = useState({
    firstName: '',
    lastName: '',
    relationshipToBaby: '',
    contactNumber: '',
    profilePicture: null,
    joiningDate: '',
    loginHistory: [],
  });

  const [profileType, setProfileType] = useState('parent');

  useEffect(() => {
    const selectedType = localStorage.getItem('selectedProfileType');
    if (selectedType) setProfileType(selectedType);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setParentProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handlePictureUpload = (e) => {
    const file = e.target.files[0];
    setParentProfile((prev) => ({ ...prev, profilePicture: file }));
  };

  const handleSave = () => {
    if (!parentProfile.firstName || !parentProfile.lastName || !parentProfile.relationshipToBaby || !parentProfile.contactNumber || !parentProfile.joiningDate) {
      alert('Please fill in all required fields.');
      return;
    }

    const timestamp = new Date().toLocaleString();
    const updatedHistory = [...parentProfile.loginHistory, `Profile created on ${timestamp}`];
    const finalProfile = { ...parentProfile, loginHistory: updatedHistory };

    const pendingProfiles = JSON.parse(localStorage.getItem('pendingProfiles')) || [];
    pendingProfiles.push({ type: profileType, data: finalProfile });
    localStorage.setItem('pendingProfiles', JSON.stringify(pendingProfiles));

    alert('Parent profile submitted for approval.');
  };

  return (
    <div style={{ marginTop: '20px', padding: '20px', border: '1px solid gray' }}>
      <h3 style={{ fontWeight: 'bold' }}>Parent Profile</h3>

      <div style={{ marginBottom: '10px' }}>
        <label>First Name:</label>
        <input type="text" name="firstName" value={parentProfile.firstName} onChange={handleChange} />
      </div>

      <div style={{ marginBottom: '10px' }}>
        <label>Last Name:</label>
        <input type="text" name="lastName" value={parentProfile.lastName} onChange={handleChange} />
      </div>

      <div style={{ marginBottom: '10px' }}>
        <label>Relationship to Baby:</label>
        <input type="text" name="relationshipToBaby" value={parentProfile.relationshipToBaby} onChange={handleChange} />
      </div>

      <div style={{ marginBottom: '10px' }}>
        <label>Contact Number:</label>
        <input type="tel" name="contactNumber" value={parentProfile.contactNumber} onChange={handleChange} />
      </div>

      <div style={{ marginBottom: '10px' }}>
        <label>Date of Joining:</label>
        <input type="date" name="joiningDate" value={parentProfile.joiningDate} onChange={handleChange} />
      </div>

      <div style={{ marginBottom: '10px' }}>
        <label>Upload Profile Picture:</label>
        <input type="file" accept="image/*" onChange={handlePictureUpload} />
      </div>

      <button onClick={handleSave}>Submit for Approval</button>
    </div>
  );
};

export default ParentProfileCreate;
