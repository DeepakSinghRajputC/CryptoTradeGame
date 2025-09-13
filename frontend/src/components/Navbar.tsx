import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Navbar: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <header className="bg-blue-600 dark:bg-gray-800 text-white p-4 shadow-lg">
      <nav className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2 text-xl font-bold hover:text-blue-200 dark:hover:text-blue-300 transition-colors">
          <img src="/crypto-logo.svg" alt="CryptoTradeGame Logo" className="w-8 h-8" />
          <span>CryptoTradeGame</span>
        </Link>
        <div className="flex items-center space-x-4">
          <Link to="/" className="hover:underline transition-colors">Home</Link>
          <Link to="/trade" className="hover:underline transition-colors">Trade</Link>
          <Link to="/history" className="hover:underline transition-colors">History</Link>
          {isAuthenticated ? (
            <button onClick={logout} className="hover:underline transition-colors">Logout</button>
          ) : (
            <>
              <Link to="/login" className="hover:underline transition-colors">Login</Link>
              <Link to="/signup" className="hover:underline transition-colors">Signup</Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;