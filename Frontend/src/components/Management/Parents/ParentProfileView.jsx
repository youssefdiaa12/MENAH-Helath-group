import React, { useEffect, useState } from 'react';

const ParentProfileView = () => {
    const [parentProfile, setParentProfile] = useState(null);

    useEffect(() => {
        const profileData = JSON.parse(localStorage.getItem('parentProfile')) || { name: 'Parent Name', email: 'parent@example.com' };
        setParentProfile(profileData);
    }, []);

    if (!parentProfile) {
        return <div>Loading...</div>;
    }

    return (
        // 🔴 Border removed from this div
        <div style={{ padding: '20px', margin: '20px' }}>
            <h2 style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '24px' }}>
                Parent Profile Information
            </h2>
            <div style={{ marginTop: '20px' }}>
                <p><strong>Name:</strong> {parentProfile.name}</p>
                <p><strong>Email:</strong> {parentProfile.email}</p>
            </div>
        </div>
    );
};

export default ParentProfileView;