import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContextValue';
import type { AuthContextType } from '../contexts/AuthContextValue';

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};