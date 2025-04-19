import React, { useContext, useState } from 'react';
import { BabyContext } from "../../context/BabyContext";
import TitleSub from '../TitleSub';
import MotherInfoIDCapture from './MotherInfoIDCapture/MotherInfoIDCapture';
import MotherInfoIDScan from './MotherInfoIDScan/MotherInfoIDScan';
import MotherInfoIDUpload from './MotherInfoIDUpload/MotherInfoIDUpload';

const MotherInfoID = () => {
  const { babyData } = useContext(BabyContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('capture');

  const contentStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '25px',
    marginTop: '20px'
  };

  return (
    <div style={{ margin: '20px', padding: '20px' }}>
      <TitleSub
        sectionTitle="Mother Identification"
        babyName={babyData?.babyName}
        babyMRN={babyData?.babyMRN}
        loggedInUser={localStorage.getItem('currentUsername')}
      />

      {/* Search Bar */}
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Search ID records..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            width: '100%',
            padding: '10px',
            borderRadius: '4px',
            border: '1px solid #ced4da',
            fontSize: '16px'
          }}
        />
      </div>

      {/* Navigation Tabs */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        {['capture', 'scan', 'upload'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: '10px 20px',
              backgroundColor: activeTab === tab ? '#1a237e' : '#fff',
              color: activeTab === tab ? 'white' : '#1a237e',
              border: `2px solid #1a237e`,
              borderRadius: '5px',
              cursor: 'pointer',
              textTransform: 'capitalize'
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div style={contentStyle}>
        {activeTab === 'capture' && <MotherInfoIDCapture />}
        {activeTab === 'scan' && <MotherInfoIDScan />}
        {activeTab === 'upload' && <MotherInfoIDUpload />}
      </div>

      {/* Status Bar */}
      <div style={{
        marginTop: '20px',
        padding: '10px',
        backgroundColor: '#e3f2fd',
        borderRadius: '4px',
        textAlign: 'center',
        fontSize: '14px'
      }}>
        {babyData?.motherID ?
          `ID Verified - Last Updated: ${new Date().toLocaleDateString()}` :
          'No ID Information Available'}
      </div>
    </div>
  );
};

export default MotherInfoID;
