// src/context/AuthContext.jsx
import { useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';

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
