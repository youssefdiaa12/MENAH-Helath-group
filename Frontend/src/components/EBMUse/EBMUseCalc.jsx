import React, { useContext, useState, useEffect } from 'react';
import { BabyContext } from '../../context/BabyContext';
import TitleSub from '../TitleSub'; // Adjust the path if needed

const EBMUseCalc = () => {
  const { babyData } = useContext(BabyContext);
  const [totalBottlesUsed, setTotalBottlesUsed] = useState(0);
  const [totalMilkUsed, setTotalMilkUsed] = useState(0);
  const [totalMilkDiscarded, setTotalMilkDiscarded] = useState(0);
  const [viableBottles, setViableBottles] = useState(0);

  useEffect(() => {
    const bottlesUsed = babyData.ebmUsedBottles ? babyData.ebmUsedBottles.length : 0;
    setTotalBottlesUsed(bottlesUsed);

    const milkUsed = babyData.ebmUsedBottles
      ? babyData.ebmUsedBottles.reduce((sum, bottle) => sum + Number(bottle.milkUsed || 0), 0)
      : 0;
    setTotalMilkUsed(milkUsed);

    const milkDiscarded = babyData.ebmUsedBottles
      ? babyData.ebmUsedBottles.reduce((sum, bottle) => sum + Number(bottle.milkDiscarded || 0), 0)
      : 0;
    setTotalMilkDiscarded(milkDiscarded);

    const totalDeliveredBottles = babyData.ebmBottles ? babyData.ebmBottles.length : 0;
    setViableBottles(totalDeliveredBottles - bottlesUsed);
  }, [babyData.ebmUsedBottles, babyData.ebmBottles]);

  return (
    <div style={{ padding: '10px', marginTop: '10px' }}>
      <TitleSub
        sectionTitle="Used EBM Bottles"
        babyName={babyData?.babyName}
        babyMRN={babyData?.babyMRN}
        loggedInUser={localStorage.getItem('currentUserRole')}
      />

      <div style={{ marginBottom: '10px' }}>
        <label>Total Number of Used Bottles:</label>
        <input type="text" value={totalBottlesUsed} disabled />
      </div>

      <div style={{ marginBottom: '10px' }}>
        <label>Total Volume of Milk Used (ml):</label>
        <input type="text" value={totalMilkUsed} disabled />
      </div>

      <div style={{ marginBottom: '10px' }}>
        <label>Total Volume of Milk Discarded (ml):</label>
        <input type="text" value={totalMilkDiscarded} disabled />
      </div>

      <div style={{ marginBottom: '10px' }}>
        <label>Total Number of Viable EBM Bottles:</label>
        <input type="text" value={viableBottles} disabled />
      </div>
    </div>
  );
};

export default EBMUseCalc;
