import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Navbar: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <header className="bg-blue-600 text-white p-4">
      <nav className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold hover:text-blue-200">CryptoTradeGame</Link>
        <div className="space-x-4">
          <Link to="/" className="hover:underline">Home</Link>
          {isAuthenticated ? (
            <button onClick={logout} className="hover:underline">Logout</button>
          ) : (
            <>
              <Link to="/login" className="hover:underline">Login</Link>
              <Link to="/signup" className="hover:underline">Signup</Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;