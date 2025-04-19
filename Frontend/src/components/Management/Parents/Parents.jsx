import React from 'react';
import ParentDashboard from './ParentDashboard';

const Parents = () => {
  return (
    <div style={{ textAlign: 'center', padding: '20px', border: '3px solid black', margin: '20px' }}>
      <h2 style={{ fontWeight: 'bold', fontSize: '24px' }}>Parent Dashboard</h2>
      <ParentDashboard />
    </div>
  );
};

export default Parents;