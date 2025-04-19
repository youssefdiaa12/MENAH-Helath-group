import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/styles/global.css'; // Import global styles
import App from './App'; // Import App component
import { BabyProvider } from './context/BabyContext'; // Import BabyProvider

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BabyProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </BabyProvider>
);
