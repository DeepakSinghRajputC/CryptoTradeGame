import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import { AuthContext } from './AuthContextValue';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      // Optionally verify token with backend
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      const { token } = response.data;
      localStorage.setItem('token', token);
      setIsAuthenticated(true);
    } catch (error) {
        console.error('Login error:', error);
      throw error;
    }
  };

  const signup = async (email: string, password: string) => {
    try {
      const response = await api.post('/auth/signup', { email, password });
      const { token } = response.data;
      localStorage.setItem('token', token);
      setIsAuthenticated(true);
    } catch (error) {
        console.error('Signup error:', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};