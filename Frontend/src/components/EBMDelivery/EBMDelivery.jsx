import React, { useContext } from 'react';
import EBMDeliveryTable from './EBMDeliveryTable';
import EBMDeliveryCalc from './EBMDeliveryCalc';
import QRCodeGenerate from './QRCodeGenerate';
import EBMDeliveryInfo from './EBMDeliveryInfo';
import { BabyContext } from "../../context/BabyContext";
import AutoLogout from '../Management/AutoLogout';
import { useNavigate } from 'react-router-dom';
import TitleSub from '../TitleSub';

const EBMDelivery = () => {
  const { babyData } = useContext(BabyContext);
  const navigate = useNavigate();
  const role = localStorage.getItem('currentUserRole');

  const handleBack = () => {
    if (role === 'admin') navigate('/management/admin/dashboard');
    else if (role === 'nurse') navigate('/management/nurse');
    else navigate('/');
  };

  const handleLogout = () => {
    const now = new Date().toLocaleString();
    const historyKey =
      role === 'admin'
        ? 'adminLogoutHistory'
        : role === 'nurse'
        ? 'nurseLogoutHistory'
        : null;

    if (historyKey) {
      const currentHistory = JSON.parse(localStorage.getItem(historyKey)) || [];
      currentHistory.push(now);
      localStorage.setItem(historyKey, JSON.stringify(currentHistory));
    }

    localStorage.removeItem('currentUserRole');
    navigate('/');
  };

  return (
    <div style={{ margin: '20px', padding: '10px', boxSizing: 'border-box' }}>
      <AutoLogout />
      <TitleSub
        sectionTitle="EBM Delivery"
        babyName={babyData?.babyName}
        babyMRN={babyData?.babyMRN}
        loggedInUser={role}
      />

      <div>
        <QRCodeGenerate />
      </div>

      <div>
        <EBMDeliveryInfo />
      </div>

      <div>
        <EBMDeliveryCalc />
      </div>

      <div>
        <EBMDeliveryTable />
      </div>
    </div>
  );
};

export default EBMDelivery;
