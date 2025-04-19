import React, { useState, useContext, useEffect } from 'react';
import { BabyContext } from '../../context/BabyContext';
import TitleSub from '../TitleSub';

const EBMDeliveryInfo = () => {
  const { babyData, updateBabyData } = useContext(BabyContext);

  const [localData, setLocalData] = useState({
    orderNumber: 1,
    uniqueID: '',
    expressionDate: '',
    deliveryDate: '',
    volume: '',
  });

  const [saved, setSaved] = useState(false);
  const [nurse2CodeInput, setNurse2CodeInput] = useState('');
  const [awaitingVerification, setAwaitingVerification] = useState(false);

  useEffect(() => {
    const currentOrder = babyData.ebmBottles ? babyData.ebmBottles.length + 1 : 1;
    setLocalData((prev) => ({
      ...prev,
      orderNumber: currentOrder,
      uniqueID: Math.floor(100000 + Math.random() * 900000),
    }));
  }, [babyData.ebmBottles]);

  const handleChange = (e) => {
    setLocalData({ ...localData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    if (!localData.expressionDate || !localData.deliveryDate || !localData.volume) {
      alert("Please fill all fields before saving.");
      return;
    }

    const nurse2StoredCode = localStorage.getItem('nurseVerificationCode');
    if (!nurse2StoredCode) {
      alert("Nurse 2 verification code not set.");
      return;
    }

    const nurse1Name = localStorage.getItem('nurseName') || "Nurse 1";
    localStorage.setItem('pendingNurseVerification', JSON.stringify({
      babyName: babyData.babyName,
      babyMRN: babyData.babyMRN,
      method: 'Add EBM Bottle',
      requestedBy: nurse1Name
    }));

    alert("Verification request sent to Nurse 2.");
    setAwaitingVerification(true);
  };

  const handleConfirmVerification = () => {
    const nurse2StoredCode = localStorage.getItem('nurseVerificationCode');
    if (nurse2CodeInput === nurse2StoredCode) {
      const updatedBottles = babyData.ebmBottles ? [...babyData.ebmBottles, localData] : [localData];
      updateBabyData({ ...babyData, ebmBottles: updatedBottles });

      setLocalData({
        orderNumber: updatedBottles.length + 1,
        uniqueID: Math.floor(100000 + Math.random() * 900000),
        expressionDate: '',
        deliveryDate: '',
        volume: '',
      });

      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
      setAwaitingVerification(false);
      setNurse2CodeInput('');
    } else {
      alert("Incorrect Nurse 2 code.");
    }
  };

  return (
    <div style={{ padding: '10px', marginTop: '10px' }}>
      <TitleSub
        sectionTitle="EBM Delivery Information"
        babyName={babyData?.babyName}
        babyMRN={babyData?.babyMRN}
        loggedInUser={localStorage.getItem('currentUsername')}
      />

      <label>Order:</label>
      <input type="text" value={localData.orderNumber} disabled /><br />

      <label>Unique ID:</label>
      <input type="text" value={localData.uniqueID} disabled /><br />

      <label>Date of Expression:</label>
      <input type="date" name="expressionDate" value={localData.expressionDate} onChange={handleChange} /><br />

      <label>Date of Delivery:</label>
      <input type="date" name="deliveryDate" value={localData.deliveryDate} onChange={handleChange} /><br />

      <label>Volume (ml):</label>
      <input type="number" name="volume" value={localData.volume} onChange={handleChange} /><br />

      {!awaitingVerification ? (
        <button onClick={handleSave}>Save</button>
      ) : (
        <div>
          <label>Verification Code:</label>
          <input type="password" value={nurse2CodeInput} onChange={(e) => setNurse2CodeInput(e.target.value)} />
          <button onClick={handleConfirmVerification}>Confirm</button>
        </div>
      )}

      {saved && <p style={{ color: 'green' }}>Saved successfully!</p>}
    </div>
  );
};

export default EBMDeliveryInfo;
