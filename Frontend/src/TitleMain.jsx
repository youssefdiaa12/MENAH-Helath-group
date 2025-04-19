import React from 'react';

const containerStyle = {
  width: '100%',
  padding: '10px',
  boxSizing: 'border-box',
  backgroundColor: '#ffffff',
};

const combinedLineStyle = {
  textAlign: 'left',
  fontFamily: '"Times New Roman", Times, serif',
  fontWeight: 'bold',
  fontSize: '28px',
  display: 'flex',
  alignItems: 'flex-end',
};

const subTextStyle = {
  fontSize: '12px',
  fontStyle: 'italic',
  fontWeight: 'normal',
  marginLeft: '10px',
};

const TitleMain = () => {
  return (
    <div style={containerStyle}>
      <div style={combinedLineStyle}>
        Halebi; EBM Verification System
        <span style={subTextStyle}>Powered by MENAH and Smart Solutions</span>
      </div>
    </div>
  );
};

export default TitleMain;
