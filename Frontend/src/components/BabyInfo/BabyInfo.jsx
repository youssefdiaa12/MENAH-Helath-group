import React, { useState, useEffect, useContext } from 'react';
import { BabyContext } from '../../context/BabyContext';

import TitleSub from '../TitleSub';
import BabyInfoAddNewRecord from './BabyInfoAddNewRecord';
import BabyInfoSearch from './BabyInfoSearch';
import './BabyInfoSearch.css';
import BabyInfoTranslate from './BabyInfoTranslate';
import BabyInfoIdentify from './BabyInfoIdentify';
import BabyInfoGA from './BabyInfoGA';
import BabyInfoBio from './BabyInfoBio';
import BabyInfoSave from './BabyInfoSave';

const BabyInfo = () => {
  const { updateBabyData } = useContext(BabyContext);

  const savedData = JSON.parse(localStorage.getItem("selectedBaby"));
  const defaultData = {
    babyName: "",
    babyNameArabic: "",
    babyMRN: "",
    visitNumber: "",
    gender: "",
    birthWeight: "",
    dob: "",
    gaWeeks: 0,
    gaDays: 0,
    passportId: "",
    personalId: "",
    birthCertificateId: "",
  };

  // Initialize state here, NOT inside useEffect
  const [localData, setLocalData] = useState(savedData || defaultData);

  // useEffect should be used to perform side effects like storing data into localStorage
  useEffect(() => {
    localStorage.setItem("activeComponent", "BabyInfo");
  }, []);

  return (
    <div style={{ padding: '10px' }}>
      <TitleSub sectionTitle="Baby Information" />

      {/* Add New Record + Search in the same line */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
        <BabyInfoAddNewRecord setLocalData={setLocalData} />
        <BabyInfoSearch setLocalData={setLocalData} /> {/* Search is inside BabyInfo */}
      </div>

      <BabyInfoTranslate localData={localData} setLocalData={setLocalData} />
      <BabyInfoIdentify localData={localData} setLocalData={setLocalData} />
      <BabyInfoGA localData={localData} setLocalData={setLocalData} />
      <BabyInfoBio localData={localData} setLocalData={setLocalData} />
      <BabyInfoSave localData={localData} updateBabyData={updateBabyData} />
    </div>
  );
};

export default BabyInfo;
