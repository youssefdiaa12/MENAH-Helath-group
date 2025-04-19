import React, { useEffect, useState } from 'react';

const NurseProfileView = () => {
    const [nurseProfile, setNurseProfile] = useState(null);

    useEffect(() => {
        const profileData = JSON.parse(localStorage.getItem('nurseProfile')) || { name: 'Nurse Name', email: 'nurse@example.com' };
        setNurseProfile(profileData);
    }, []);

    if (!nurseProfile) {
        return <div>Loading...</div>;
    }

    return (
        // 🔴 Border removed from this div
        <div style={{ padding: '20px', margin: '20px' }}>
            <h2 style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '24px' }}>
                Nurse Profile Information
            </h2>
            <div style={{ marginTop: '20px' }}>
                <p><strong>Name:</strong> {nurseProfile.name}</p>
                <p><strong>Email:</strong> {nurseProfile.email}</p>
            </div>
        </div>
    );
};

export default NurseProfileView;