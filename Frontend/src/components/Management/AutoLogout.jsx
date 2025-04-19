import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AutoLogout = ({ timeout = 5 * 60 * 1000 }) => {
  const navigate = useNavigate();

  useEffect(() => {
    let logoutTimer;

    const resetTimer = () => {
      clearTimeout(logoutTimer);
      logoutTimer = setTimeout(() => {
        alert("Session expired due to inactivity.");
        localStorage.clear();
        navigate('/');
      }, timeout);
    };

    const events = ['mousemove', 'keydown', 'mousedown', 'touchstart'];

    events.forEach((event) => window.addEventListener(event, resetTimer));
    resetTimer();

    return () => {
      clearTimeout(logoutTimer);
      events.forEach((event) => window.removeEventListener(event, resetTimer));
    };
  }, [navigate, timeout]);

  return null;
};

export default AutoLogout;
