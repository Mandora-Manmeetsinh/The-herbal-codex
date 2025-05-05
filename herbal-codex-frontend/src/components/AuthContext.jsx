// src/context/AuthContext.jsx
import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: '',
  });

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('auth'));
    if (saved) setAuth(saved);
  }, []);

  const login = (userData) => {
    localStorage.setItem('auth', JSON.stringify(userData));
    setAuth(userData);
  };

  const logout = () => {
    localStorage.removeItem('auth');
    setAuth({ user: null, token: '' });
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;