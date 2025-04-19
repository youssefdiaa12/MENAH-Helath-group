import React, { useContext, useRef, useState, useEffect } from 'react';
import QRCode from 'qrcode.react';
import { useReactToPrint } from 'react-to-print';
import { BabyContext } from '../../context/BabyContext';
import TitleSub from '../TitleSub';

const generateRandomTrackingNumbers = (count) => {
  const numbers = new Set();
  while (numbers.size < count) {
    const randomNum = `BTL-${Math.floor(10000000 + Math.random() * 90000000)}`;
    numbers.add(randomNum);
  }
  return Array.from(numbers);
};

const QRCodeGenerate = () => {
  const { babyData, updateBabyData } = useContext(BabyContext);
  const [selectedBottles, setSelectedBottles] = useState(new Set());
  const [rangeStart, setRangeStart] = useState(1);
  const [rangeEnd, setRangeEnd] = useState(100);
  const [showRangeModal, setShowRangeModal] = useState(false);
  const printRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    pageStyle: `@media print { @page { margin: 5mm; } }`
  });

  useEffect(() => {
    if (!babyData.bottles) {
      const trackingNumbers = generateRandomTrackingNumbers(100);
      const bottles = Array.from({ length: 100 }, (_, i) => ({
        id: i + 1,
        trackingNumber: trackingNumbers[i],
        displayNumber: i + 1
      }));
      updateBabyData({ ...babyData, bottles });
    }
  }, [babyData, updateBabyData]);

  const toggleSelection = (id) => {
    setSelectedBottles(prev => {
      const newSet = new Set(prev);
      newSet.has(id) ? newSet.delete(id) : newSet.add(id);
      return newSet;
    });
  };

  const selectRange = () => {
    const start = Math.min(rangeStart, rangeEnd);
    const end = Math.max(rangeStart, rangeEnd);
    const newSelection = new Set();
    for (let i = start; i <= end; i++) newSelection.add(i);
    setSelectedBottles(newSelection);
    setShowRangeModal(false);
  };

  return (
    <div style={{ padding: '10px', marginBottom: '10px' }}>
      <TitleSub
        sectionTitle="QR Code Generation"
        babyName={babyData.babyName}
        babyMRN={babyData.babyMRN}
        loggedInUser={localStorage.getItem("currentUsername")}
      />

      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <button onClick={handlePrint} style={{ padding: '8px 16px' }}>
          Print Selected ({selectedBottles.size})
        </button>
        <button
          onClick={() => setSelectedBottles(new Set(babyData.bottles?.map(b => b.id)))}
          style={{ padding: '8px 16px' }}
        >
          Select All
        </button>
        <button
          onClick={() => setSelectedBottles(new Set())}
          style={{ padding: '8px 16px' }}
        >
          Deselect All
        </button>
        <button
          onClick={() => setShowRangeModal(true)}
          style={{ padding: '8px 16px' }}
        >
          Select Range
        </button>
      </div>

      {showRangeModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <div style={{ background: 'white', padding: '20px', borderRadius: '8px' }}>
            <h3>Select Bottle Range</h3>
            <input
              type="number" min="1" max="100"
              value={rangeStart}
              onChange={(e) => setRangeStart(Math.max(1, Math.min(100, Number(e.target.value))))}
              style={{ margin: '10px', padding: '5px' }}
            />
            <input
              type="number" min="1" max="100"
              value={rangeEnd}
              onChange={(e) => setRangeEnd(Math.max(1, Math.min(100, Number(e.target.value))))}
              style={{ margin: '10px', padding: '5px' }}
            />
            <div style={{ marginTop: '10px' }}>
              <button onClick={selectRange} style={{ marginRight: '10px' }}>Apply</button>
              <button onClick={() => setShowRangeModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
        gap: '10px', marginBottom: '20px'
      }}>
        {babyData.bottles?.map(bottle => (
          <div key={bottle.id} style={{
            border: '1px solid #ddd', padding: '10px', textAlign: 'center',
            backgroundColor: selectedBottles.has(bottle.id) ? '#e3f2fd' : 'white'
          }}>
            <input
              type="checkbox"
              checked={selectedBottles.has(bottle.id)}
              onChange={() => toggleSelection(bottle.id)}
              style={{ marginBottom: '8px' }}
            />
            <QRCode
              value={JSON.stringify({
                babyName: babyData.babyName,
                babyMRN: babyData.babyMRN,
                bottleNumber: bottle.displayNumber,
                trackingNumber: bottle.trackingNumber
              })}
              size={128}
              style={{ margin: '0 auto' }}
            />
            <div style={{ marginTop: '8px' }}>
              <div>Bottle #{bottle.displayNumber}</div>
              <div style={{ fontSize: '0.8em', wordBreak: 'break-all' }}>{bottle.trackingNumber}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'none' }}>
        <div ref={printRef}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '20px',
            padding: '20px'
          }}>
            {babyData.bottles?.filter(bottle => selectedBottles.has(bottle.id)).map(bottle => (
              <div key={bottle.id} style={{ pageBreakInside: 'avoid' }}>
                <QRCode
                  value={JSON.stringify({
                    babyName: babyData.babyName,
                    babyMRN: babyData.babyMRN,
                    bottleNumber: bottle.displayNumber,
                    trackingNumber: bottle.trackingNumber
                  })}
                  size={256}
                />
                <div style={{ textAlign: 'center', marginTop: '10px' }}>
                  <div><strong>Baby:</strong> {babyData.babyName}</div>
                  <div><strong>MRN:</strong> {babyData.babyMRN}</div>
                  <div><strong>Bottle #:</strong> {bottle.displayNumber}</div>
                  <div><strong>Tracking Code:</strong> {bottle.trackingNumber}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRCodeGenerate;
