import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import NurseDashboard from './NurseDashboard';

const NurseLogin = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [useBiometric, setUseBiometric] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const generatedCode = "654321";

  const handleLogin = () => {
    if (email === "nurse@example.com" && password === "nursepass") {
      setStep(2);
    } else {
      alert("Invalid email or password.");
    }
  };

  const verifyCode = () => {
    if (verificationCode === generatedCode) {
      localStorage.setItem('currentUserRole', 'nurse'); // ✅ role set for nurse
      login({ role: 'nurse' });
      setIsLoggedIn(true);
    } else {
      alert("Incorrect verification code.");
    }
  };

  const handleBiometricLogin = () => {
    alert("Biometric authentication successful!");
    localStorage.setItem('currentUserRole', 'nurse'); // ✅ role set for nurse
    login({ role: 'nurse' });
    setIsLoggedIn(true);
  };

  if (isLoggedIn) {
    return <NurseDashboard />;
  }

  return (
    <div style={{ textAlign: 'center', padding: '20px', border: '3px solid black', margin: '20px' }}>
      <div style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        zIndex: 1000
      }}>
        <button
          onClick={() => navigate('/')}
          style={{ padding: '8px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px' }}
        >
          Back to Main Page
        </button>
        <button
          onClick={() => {
            const currentHistory = JSON.parse(localStorage.getItem('nurseLogoutHistory')) || [];
            currentHistory.push(new Date().toLocaleString());
            localStorage.setItem('nurseLogoutHistory', JSON.stringify(currentHistory));
            localStorage.setItem('currentUserRole', ''); // optional: clear role on logout
            navigate('/');
          }}
          style={{ padding: '8px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '5px' }}
        >
          Logout
        </button>
      </div>

      <h2 style={{ fontWeight: 'bold', fontSize: '24px' }}>Nurse Login</h2>

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
  );
};

export default NurseLogin;
