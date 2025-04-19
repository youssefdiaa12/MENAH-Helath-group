import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CommonLogin = () => {
    const [role, setRole] = useState('');
    const navigate = useNavigate();

    const handleLogin = () => {
        if (role) {
            // Save the role in localStorage
            localStorage.setItem("currentUserRole", role);

            // Navigate to the appropriate page based on the role selected
            navigate(`/management/${role}/login`);
        } else {
            alert("Please select a role to log in.");
        }
    };

    return (
        <div className="login-container">
            <h2>Login to Halebi System</h2>

            <div>
                <label>
                    Select Role:
                    <select onChange={(e) => setRole(e.target.value)} value={role}>
                        <option value="">--Select--</option>
                        <option value="admin">Admin</option>
                        <option value="nurse">Nurse</option>
                        <option value="parent">Parent</option>
                    </select>
                </label>
            </div>

            <button onClick={handleLogin} className="login-button">Log In</button>
        </div>
    );
};

export default CommonLogin;
