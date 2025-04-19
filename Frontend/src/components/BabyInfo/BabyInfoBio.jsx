import React, { useContext } from 'react';
import { BabyContext } from '../../context/BabyContext';

const BabyInfoBio = () => {
  const { babyData, updateBabyData } = useContext(BabyContext);

  return (
    <div>
      <label>Gender:</label>
      <select
        value={babyData.gender || ''}
        onChange={(e) => updateBabyData({ gender: e.target.value })}
      >
        <option value="">Select Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Others">Others; unassigned (ambiguous)</option>
      </select>

      <label>Birth Weight:</label>
      <select
        value={babyData.birthWeight || ''}
        onChange={(e) => updateBabyData({ birthWeight: e.target.value })}
      >
        <option value="">Select Weight</option>
        {Array.from({ length: 5651 }, (_, i) => 350 + i).map((weight) => (
          <option key={weight} value={weight}>
            {weight} grams
          </option>
        ))}
      </select>
    </div>
  );
};

export default BabyInfoBio;