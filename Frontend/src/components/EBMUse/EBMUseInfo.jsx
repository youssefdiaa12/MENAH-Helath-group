import React, { useContext, useState } from 'react';
import { BabyContext } from '../../context/BabyContext';
import TitleSub from '../TitleSub';

const EBMUseTable = () => {
  const { babyData } = useContext(BabyContext);
  const [showTable, setShowTable] = useState(false);

  return (
    <div style={{ padding: '10px', marginTop: '10px', textAlign: 'left' }}>
      <TitleSub
        sectionTitle="Used EBM Bottles Table"
        babyName={babyData?.babyName}
        babyMRN={babyData?.babyMRN}
        loggedInUser={localStorage.getItem('currentUserRole')}
      />

      <button
        onClick={() => setShowTable(!showTable)}
        style={{
          padding: '10px',
          fontSize: '14px',
          fontWeight: 'bold',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          marginBottom: '10px'
        }}
      >
        {showTable ? "Hide" : "Show"} Used EBM Bottles Table
      </button>

      {showTable && (
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '10px' }}>
          <thead>
            <tr style={{ background: '#f2f2f2', borderBottom: '2px solid black' }}>
              <th style={{ border: '1px solid black', padding: '5px' }}>Bottle #</th>
              <th style={{ border: '1px solid black', padding: '5px' }}>Volume Used (ml)</th>
              <th style={{ border: '1px solid black', padding: '5px' }}>Volume Discarded (ml)</th>
            </tr>
          </thead>
          <tbody>
            {babyData.ebmUsedBottles && babyData.ebmUsedBottles.length > 0 ? (
              babyData.ebmUsedBottles.map((bottle, index) => (
                <tr key={index}>
                  <td style={{ border: '1px solid black', padding: '5px' }}>{index + 1}</td>
                  <td style={{ border: '1px solid black', padding: '5px' }}>{bottle.milkUsed}</td>
                  <td style={{ border: '1px solid black', padding: '5px' }}>{bottle.milkDiscarded}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" style={{ textAlign: 'center', padding: '10px' }}>
                  No Used EBM Bottles Recorded
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default EBMUseTable;
