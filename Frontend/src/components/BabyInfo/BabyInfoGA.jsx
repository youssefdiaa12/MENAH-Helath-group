import React, { useContext } from 'react';
import { BabyContext } from '../../context/BabyContext';

const BabyInfoGA = () => {
  const { babyData, updateBabyData } = useContext(BabyContext);
  const currentDate = new Date().toISOString().split('T')[0];

  const calculateDOL = () => {
    if (!babyData.dob) return '';
    const dobDate = new Date(babyData.dob);
    const currentDateObj = new Date();
    const diffTime = currentDateObj - dobDate;
    const diffDays = Math.floor(diffTime / (1000 * 3600 * 24));
    return diffDays >= 0 ? `${diffDays} Days` : 'Invalid Date';
  };

  const calculateCGA = () => {
    if (!babyData.dob || !babyData.gaWeeks || !babyData.gaDays) return '';
    const dol = parseInt(calculateDOL().split(' ')[0], 10);
    if (isNaN(dol)) return '';
    const totalWeeks = babyData.gaWeeks + Math.floor(dol / 7);
    const totalDays = (babyData.gaDays + (dol % 7)) % 7;
    return `${totalWeeks} Weeks ${totalDays} Days`;
  };

  return (
    <div>
      <label>Date of Birth (DOB):</label>
      <input
        type="date"
        value={babyData.dob || ''}
        onChange={(e) => updateBabyData({ dob: e.target.value })}
      />

      <label>Current Date:</label>
      <input
        type="date"
        value={currentDate}
        readOnly
      />

      <label>Days of Life (DOL):</label>
      <input
        type="text"
        value={calculateDOL()}
        readOnly
      />

      <label>Gestational Age at Birth:</label>
      <div style={{ display: 'flex', gap: '10px' }}>
        <select
          value={babyData.gaWeeks !== 22 ? babyData.gaWeeks : ""}
          onChange={(e) => updateBabyData({ gaWeeks: Number(e.target.value) })}
        >
          <option value="">Select Week</option>
          {Array.from({ length: 34 }, (_, i) => 22 + i).map((week) => (
            <option key={week} value={week}>{week} Weeks</option>
          ))}
        </select>
        <select
          value={babyData.gaDays || ""}
          onChange={(e) => updateBabyData({ gaDays: Number(e.target.value) })}
        >
          <option value="">Select Day</option>
          {Array.from({ length: 7 }, (_, i) => i).map((day) => (
            <option key={day} value={day}>{day} Days</option>
          ))}
        </select>
      </div>

      <label>Corrected Gestational Age (CGA):</label>
      <input
        type="text"
        value={calculateCGA()}
        readOnly
      />
    </div>
  );
};

export default BabyInfoGA;