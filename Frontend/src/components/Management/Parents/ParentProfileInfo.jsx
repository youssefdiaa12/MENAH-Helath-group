import React from 'react';
import { useNavigate } from 'react-router-dom';
import ParentProfileView from '../Parents/ParentProfileView'; // ✅ Correct import

const ParentProfileInfo = () => {
  const navigate = useNavigate();

  return (
    <div style={{ padding: '20px', margin: '20px', border: '3px solid black', backgroundColor: '#f1f1f1' }}>
      <h2 style={{ textAlign: 'center', fontWeight: 'bold', color: '#007bff' }}>My Parent Profile</h2>

      {/* Render full parent profile view */}
      <ParentProfileView />

      {/* Floating back button */}
      <div style={{ position: 'fixed', top: '20px', left: '20px', zIndex: 100 }}>
        <button
          onClick={() => navigate('/management/parents')}
          style={{
            padding: '10px 20px',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Back to Parent Dashboard
        </button>
      </div>
    </div>
  );
};

export default ParentProfileInfo;
