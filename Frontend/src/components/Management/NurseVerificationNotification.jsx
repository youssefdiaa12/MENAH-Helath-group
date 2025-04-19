import React, { useEffect, useState } from 'react';

const NurseVerificationNotification = ({ loggedInNurseId }) => {
  const [pendingVerification, setPendingVerification] = useState(null);

  useEffect(() => {
    const request = JSON.parse(localStorage.getItem('pendingNurseVerification'));
    if (request && request.nurseTwoId === loggedInNurseId) {
      setPendingVerification(request);
    }
  }, [loggedInNurseId]);

  const handleApprove = () => {
    localStorage.setItem('verificationResult', JSON.stringify({ approved: true }));
    localStorage.removeItem('pendingNurseVerification');
    setPendingVerification(null);
    alert("Verification approved. Nurse 1 can now proceed.");
  };

  const handleReject = () => {
    localStorage.setItem('verificationResult', JSON.stringify({ approved: false }));
    localStorage.removeItem('pendingNurseVerification');
    setPendingVerification(null);
    alert("Verification rejected. Nurse 1 must verify mother before proceeding.");
  };

  if (!pendingVerification) return null;

  return (
    <div style={{ border: '2px solid red', padding: '15px', margin: '10px' }}>
      <h3>Milk Verification Request</h3>
      <p><strong>From:</strong> {pendingVerification.requestedBy}</p>
      <p><strong>Baby Name:</strong> {pendingVerification.babyName}</p>
      <p><strong>MRN:</strong> {pendingVerification.babyMRN}</p>
      <p><strong>Verification Method:</strong> {pendingVerification.method}</p>

      <p>
        Please confirm that the QR code on the milk bottle matches the selected verification method
        (Face Photo, Foot Print, Retina, or QR Code Band).
      </p>

      <div style={{ marginTop: '10px' }}>
        <button onClick={handleApprove} style={{ marginRight: '10px' }}>
          ✅ Verify and Approve
        </button>
        <button onClick={handleReject}>
          ❌ Reject and Notify
        </button>
      </div>
    </div>
  );
};

export default NurseVerificationNotification;
