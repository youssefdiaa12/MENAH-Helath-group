import React, { useState, useContext } from 'react';
import { BabyContext } from '../../context/BabyContext';

const EBMDeliveryTable = () => {
    const { babyData } = useContext(BabyContext);
    const [showTable, setShowTable] = useState(false);

    return (
        <div style={{ border: '1px solid gray', padding: '10px', marginTop: '10px', textAlign: 'left' }}>
            <h2 style={{ textAlign: 'center', fontWeight: 'bold', marginBottom: '10px' }}>
                Stored EBM Bottles Table
            </h2>

            <div style={{ fontSize: '14px', marginBottom: '10px' }}>
                Baby Name: {babyData.babyName || "N/A"} &nbsp;&nbsp;
                MRN: {babyData.babyMRN || "N/A"}
            </div>

            <button onClick={() => setShowTable(true)} style={{
                padding: '10px', fontSize: '14px', fontWeight: 'bold',
                backgroundColor: '#007bff', color: 'white', border: 'none',
                borderRadius: '5px', cursor: 'pointer', marginBottom: '10px'
            }}>
                Show EBM Stored Bottles Table
            </button>

            {showTable && (
                <div>
                    <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '10px' }}>
                        <thead>
                            <tr style={{ background: '#f2f2f2', borderBottom: '2px solid black' }}>
                                <th style={{ border: '1px solid black', padding: '5px' }}>Order</th>
                                <th style={{ border: '1px solid black', padding: '5px' }}>Unique ID</th>
                                <th style={{ border: '1px solid black', padding: '5px' }}>Expression Date</th>
                                <th style={{ border: '1px solid black', padding: '5px' }}>Delivery Date</th>
                                <th style={{ border: '1px solid black', padding: '5px' }}>Volume (ml)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {babyData.ebmBottles && babyData.ebmBottles.length > 0 ? (
                                babyData.ebmBottles.map((bottle, index) => (
                                    <tr key={index} style={{ borderBottom: '1px solid black' }}>
                                        <td style={{ border: '1px solid black', padding: '5px' }}>{bottle.orderNumber}</td>
                                        <td style={{ border: '1px solid black', padding: '5px' }}>{bottle.uniqueID}</td>
                                        <td style={{ border: '1px solid black', padding: '5px' }}>{bottle.expressionDate}</td>
                                        <td style={{ border: '1px solid black', padding: '5px' }}>{bottle.deliveryDate}</td>
                                        <td style={{ border: '1px solid black', padding: '5px' }}>{bottle.volume}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" style={{ textAlign: 'center', padding: '10px' }}>No EBM Bottles Stored</td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                    <button onClick={() => setShowTable(false)} style={{
                        padding: '10px', fontSize: '14px', fontWeight: 'bold',
                        backgroundColor: 'red', color: 'white', border: 'none',
                        borderRadius: '5px', cursor: 'pointer'
                    }}>
                        Hide EBM Stored Bottles Table
                    </button>
                </div>
            )}
        </div>
    );
};

export default EBMDeliveryTable;