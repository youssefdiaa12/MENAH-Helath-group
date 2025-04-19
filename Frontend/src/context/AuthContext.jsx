import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const defaultAdmin = {
    firstName: 'Yahya',
    lastName: 'Ethawi',
    email: 'yahayethawi@yahoo.com',
    mobile: '00966539820605',
    username: 'yethawi',
    password: 'SaifNoor@07',
    role: 'admin',
  };

  const login = (credentials) => {
    if (
      credentials.username === defaultAdmin.username &&
      credentials.password === defaultAdmin.password
    ) {
      setUser(defaultAdmin);
      return true;
    } else if (credentials.role === 'nurse') {
      setUser({ role: 'nurse', username: 'nurse@example.com' });
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, defaultAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };