import React, { useState } from 'react';
import ParentDashboard from './ParentDashboard';

const ParentLogin = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [useBiometric, setUseBiometric] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const generatedCode = "987654";

  const handleLogin = () => {
    if (email === "parent@example.com" && password === "parentpass") {
      setStep(2);
    } else {
      alert("Invalid email or password.");
    }
  };

  const verifyCode = () => {
    if (verificationCode === generatedCode) {
      localStorage.setItem('currentUserRole', 'parent'); // ✅ store role
      setIsLoggedIn(true);
    } else {
      alert("Incorrect verification code.");
    }
  };

  const handleBiometricLogin = () => {
    alert("Biometric authentication successful!");
    localStorage.setItem('currentUserRole', 'parent'); // ✅ store role
    setIsLoggedIn(true);
  };

  if (isLoggedIn) {
    return <ParentDashboard />;
  }

  return (
    <>
      <div style={{ position: 'fixed', top: 10, right: 10, zIndex: 999 }}>
        <button
          onClick={() => window.location.href = '/'}
          style={{
            padding: '8px 16px',
            marginRight: '10px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Back to Main Page
        </button>
        <button
          onClick={() => {
            const logoutHistory = JSON.parse(localStorage.getItem('parentLogoutHistory')) || [];
            logoutHistory.push(new Date().toLocaleString());
            localStorage.setItem('parentLogoutHistory', JSON.stringify(logoutHistory));
            localStorage.setItem('currentUserRole', '');
            window.location.href = '/';
          }}
          style={{
            padding: '8px 16px',
            backgroundColor: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Logout
        </button>
      </div>

      <div style={{ textAlign: 'center', padding: '20px', border: '3px solid black', margin: '20px' }}>
        <h2 style={{ fontWeight: 'bold', fontSize: '24px' }}>Parent Login</h2>

        {step === 1 && (
          <div>
            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ padding: '10px', margin: '10px', width: '250px' }}
            />
            <br />
            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ padding: '10px', margin: '10px', width: '250px' }}
            />
            <br />
            <button onClick={handleLogin} style={{ padding: '10px 20px', fontSize: '16px', margin: '10px' }}>
              Login
            </button>
          </div>
        )}

        {step === 2 && (
          <div>
            <p>A verification code has been sent to your email.</p>
            <input
              type="text"
              placeholder="Enter Verification Code"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              style={{ padding: '10px', margin: '10px', width: '250px' }}
            />
            <br />
            <button onClick={verifyCode} style={{ padding: '10px 20px', fontSize: '16px', margin: '10px' }}>
              Verify Code
            </button>
            <br />
            <button onClick={() => setUseBiometric(true)} style={{ padding: '10px 20px', fontSize: '16px', margin: '10px' }}>
              Use Biometric Authentication
            </button>
          </div>
        )}

        {useBiometric && (
          <div>
            <p>Scan your fingerprint or use Face ID to continue.</p>
            <button onClick={handleBiometricLogin} style={{ padding: '10px 20px', fontSize: '16px', margin: '10px' }}>
              Authenticate Biometrically
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default ParentLogin;
