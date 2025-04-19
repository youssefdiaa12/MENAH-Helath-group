// C:\Users\yahya\Halebi\src\components\Management\Nurses\NurseProfileInfo.jsx

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NurseLogHistory from './NurseLogHistory';
import NurseProfileView from "./NurseProfileView";

const NurseProfileInfo = () => {
  const [nurseData, setNurseData] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('loggedInNurse'));
    if (stored) {
      setNurseData(stored);
    }
  }, []);

  if (!nurseData) {
    return <p style={{ textAlign: 'center' }}>No profile data found.</p>;
  }

  const role = localStorage.getItem('currentUserRole');

  return (
    <div style={{ padding: '20px', margin: '20px', border: '3px solid black', backgroundColor: '#f1f1f1' }}>
      <h2 style={{ textAlign: 'center', fontWeight: 'bold', color: '#007bff' }}>My Nurse Profile</h2>

      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        {nurseData.profilePicture ? (
          <img
            src={nurseData.profilePicture}
            alt="Profile"
            style={{ width: '150px', height: '150px', borderRadius: '50%', border: '2px solid #333' }}
          />
        ) : (
          <div
            style={{
              width: '150px',
              height: '150px',
              borderRadius: '50%',
              backgroundColor: '#ccc',
              display: 'inline-block',
              lineHeight: '150px',
              fontSize: '18px',
              fontWeight: 'bold',
              border: '2px solid #333'
            }}
          >
            No Photo
          </div>
        )}
      </div>

      <div style={{ fontSize: '18px', lineHeight: '2', marginLeft: '20px' }}>
        <p><strong>First Name:</strong> {nurseData.firstName}</p>
        <p><strong>Last Name:</strong> {nurseData.lastName}</p>
        <p><strong>Username:</strong> {nurseData.username}</p>
        <p><strong>Email:</strong> {nurseData.email}</p>
        <p><strong>Mobile:</strong> {nurseData.mobileNumber}</p>
        <p><strong>Date of Joining:</strong> {nurseData.dateOfJoining}</p>
        <p>
          <strong>Password:</strong>{' '}
          {showPassword ? (nurseData.password ? nurseData.password : '********') : '********'}
          <button
            onClick={() => setShowPassword(!showPassword)}
            style={{
              marginLeft: '10px',
              padding: '3px 8px',
              fontSize: '14px',
              border: '1px solid gray',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
          <button
            title="Change Password"
            style={{
              marginLeft: '10px',
              padding: '3px 8px',
              fontSize: '14px',
              border: '1px solid #007bff',
              borderRadius: '4px',
              cursor: 'pointer',
              backgroundColor: '#e7f3ff',
              color: '#007bff'
            }}
            onClick={() => alert('Change Password feature coming soon')}
          >
            Change
          </button>
        </p>
      </div>

      <div style={{ marginTop: '30px', display: 'flex', justifyContent: 'space-between' }}>
        <button
          style={{
            padding: '10px 20px',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
          onClick={() =>
            role === 'admin'
              ? navigate('/management/admin/dashboard')
            : navigate('/management/nurse')
          }
        >
          Back to Dashboard
        </button>

        {role === 'nurse' && (
          <button
            style={{
              padding: '10px 20px',
              backgroundColor: '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
            onClick={() => {
              const logoutHistory = JSON.parse(localStorage.getItem('nurseLogoutHistory')) || [];
              logoutHistory.push(new Date().toLocaleString());
              localStorage.setItem('nurseLogoutHistory', JSON.stringify(logoutHistory));
              localStorage.removeItem('loggedInNurse');
              localStorage.setItem('currentUserRole', '');
              navigate('/');
            }}
          >
            Logout
          </button>
        )}
      </div>

      {/* Nurse login/logout history below */}
      <NurseLogHistory />
    </div>
  );
};

export default NurseProfileInfo;
