import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProtectedRoute = ({ children }) => {
const { user } = useAuth();

  if (!user) {
    // If not logged in, redirect to the login (management) page
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
