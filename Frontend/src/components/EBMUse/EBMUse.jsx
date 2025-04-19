import React, { useContext } from 'react';
import { BabyContext } from '../../context/BabyContext';
import EBMUseInfo from './EBMUseInfo';
import EBMUseCalc from './EBMUseCalc';
import EBMUseTable from './EBMUseTable';
import EBMVerify from '../EBMVerify/EBMVerify';
import { useNavigate } from 'react-router-dom';
import TitleSub from '../TitleSub'; // already correct

const EBMUse = () => {
  const { babyData } = useContext(BabyContext);
  const navigate = useNavigate();

  return (
    <div style={{ padding: '10px', marginBottom: '10px' }}>
      <TitleSub
        sectionTitle="EBM Use"
        babyName={babyData.babyName}
        babyMRN={babyData.babyMRN}
        loggedInUser={localStorage.getItem('currentUserRole')}
      />

      <EBMUseInfo />
      <EBMUseCalc />
      <EBMUseTable />
      <EBMVerify />
    </div>
  );
};

export default EBMUse;
