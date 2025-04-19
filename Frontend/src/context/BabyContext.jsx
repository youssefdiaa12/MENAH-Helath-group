import React, { createContext, useState, useEffect } from 'react';

const BabyContext = createContext(null);

export const BabyProvider = ({ children }) => {
  const [userRole, setUserRole] = useState(null);
  const [userAccess, setUserAccess] = useState({
    nurse: false,
    parent: false,
  });

  const [babyData, setBabyData] = useState({
    babyName: '',
    babyMRN: '',
    gender: '',
    dob: '',
    currentDate: new Date().toISOString().split('T')[0],
    birthWeight: '',
    gaWeeks: 22,
    gaDays: 0,
    dol: '',
    cga: '',
    qrCodeValue: '',
    babyFacePhoto: '',
  });

  // ✅ Load from localStorage when the app starts
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('babyData'));
    if (storedData) {
      setBabyData(prev => ({ ...prev, ...storedData }));
    }
  }, []);

  const updateBabyData = (newData) => {
    const calculateDOL = () => {
      if (!newData.dob) return '';
      const dobDate = new Date(newData.dob);
      const currentDateObj = new Date();
      const differenceInTime = currentDateObj - dobDate;
      const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));
      return differenceInDays >= 0 ? `${differenceInDays} Days` : 'Invalid Date';
    };

    const calculateCGA = () => {
      if (!newData.dob || !newData.gaWeeks || !newData.gaDays) return '';
      const dol = parseInt(calculateDOL().split(' ')[0], 10);
      if (isNaN(dol)) return '';
      const totalWeeks = newData.gaWeeks + Math.floor(dol / 7);
      const totalDays = (newData.gaDays + (dol % 7)) % 7;
      return `${totalWeeks} Weeks ${totalDays} Days`;
    };

    const updatedData = {
      ...babyData,
      ...newData,
      dol: calculateDOL(),
      cga: calculateCGA(),
    };

    console.log("Calculated DOL:", updatedData.dol);
    console.log("Calculated CGA:", updatedData.cga);
    console.log("QR Code Updated:", updatedData.qrCodeValue);

    setBabyData(updatedData);
    localStorage.setItem('babyData', JSON.stringify(updatedData));
  };

  return (
    <BabyContext.Provider
      value={{ babyData, updateBabyData, userRole, setUserRole, userAccess, setUserAccess }}
    >
      {children}
    </BabyContext.Provider>
  );
};

export { BabyContext };
