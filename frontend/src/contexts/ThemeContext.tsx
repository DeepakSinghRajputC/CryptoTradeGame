import React, { useState, useEffect } from 'react';
import { ThemeContext } from './ThemeContextValue';

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDarkMode] = useState(true); // Always dark mode

  useEffect(() => {
    // Always set to dark mode
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  }, []);

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme: () => {} }}>
      {children}
    </ThemeContext.Provider>
  );
};