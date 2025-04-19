import React, { useContext, useState, useEffect } from 'react';
import { BabyContext } from '../../context/BabyContext';

const EBMDeliveryCalculation = () => {
    const { babyData, updateBabyData } = useContext(BabyContext);
    const [totalBottles, setTotalBottles] = useState(0);
    const [totalVolume, setTotalVolume] = useState(0);

    useEffect(() => {
        const bottles = babyData.ebmBottles ? babyData.ebmBottles.length : 0;
        const volume = babyData.ebmBottles ? babyData.ebmBottles.reduce((sum, bottle) => sum + Number(bottle.volume || 0), 0) : 0;
        setTotalBottles(bottles);
        setTotalVolume(volume);
    }, [babyData.ebmBottles]);

    return (
        <div style={{ border: '1px solid gray', padding: '10px', marginTop: '10px', textAlign: 'left' }}>
            <h2 style={{ textAlign: 'center', fontWeight: 'bold', marginBottom: '10px' }}>
                Stored EBM Bottles
            </h2>

            <div style={{ textAlign: 'center', fontSize: '14px', marginBottom: '10px' }}>
                Baby Name: {babyData.babyName || "N/A"} &nbsp;&nbsp;
                MRN: {babyData.babyMRN || "N/A"}
            </div>

            <div style={{ marginBottom: '10px' }}>
                <label>Number of Delivered Bottles:</label>
                <input type="text" value={totalBottles} disabled />
            </div>

            <div style={{ marginBottom: '10px' }}>
                <label>Total Volume of Delivered Bottles (ml):</label>
                <input type="text" value={totalVolume} disabled />
            </div>
        </div>
    );
};

export default EBMDeliveryCalculation;