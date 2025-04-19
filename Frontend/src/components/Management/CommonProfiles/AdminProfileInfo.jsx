import React from 'react';
import { useNavigate } from 'react-router-dom';
import AdminProfileView from "../Admin/AdminProfileView";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem('currentUserRole');

  return (
    <div style={{ padding: '20px', border: '3px solid black', margin: '20px' }}>
      <h2 style={{ textAlign: 'left', fontWeight: 'bold', fontSize: '24px' }}>
        Admin Dashboard
      </h2>

      {/* Show Admin Profile Info */}
      <AdminProfileView />
    </div>
  );
};

export default AdminDashboard;
