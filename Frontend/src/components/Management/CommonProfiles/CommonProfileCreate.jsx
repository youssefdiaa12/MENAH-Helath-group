import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../Management.css";

const CommonProfileCreate = () => {
  const [profileType, setProfileType] = useState('');
  const navigate = useNavigate();

  const handleCreateProfile = () => {
    if (profileType === 'admin') {
      navigate('/management/admin/create-profile');
    } else if (profileType === 'nurse') {
      navigate('/management/nurse/create-profile');
    } else if (profileType === 'parent') {
      navigate('/management/parent/create-profile');
    }
  };

  return (
    <div className="common-profile-container">
      <h1 className="profile-create-header">Create a Profile</h1>
      <div className="profile-type-selector">
        <label htmlFor="profileType">Select Profile Type:</label>
        <select
          id="profileType"
          value={profileType}
          onChange={(e) => setProfileType(e.target.value)}
        >
          <option value="">Select...</option>
          <option value="admin">Admin</option>
          <option value="nurse">Nurse</option>
          <option value="parent">Parent</option>
        </select>
      </div>

      <button
        onClick={handleCreateProfile}
        disabled={!profileType}
        className="management-button management-create-profile-button"
      >
        Create {profileType.charAt(0).toUpperCase() + profileType.slice(1)} Profile
      </button>
    </div>
  );
};

export default CommonProfileCreate;
