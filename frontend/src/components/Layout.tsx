import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import Notification from './Notification';
import { useTrading } from '../hooks/useTrading';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { notifications, removeNotification } = useTrading();
  const location = useLocation();

  // Hide navbar on auth pages for distraction-free experience
  const hideNavbar = location.pathname === '/login' || location.pathname === '/signup';

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900 transition-colors">
      {!hideNavbar && <Navbar />}
      <main className="flex-grow container mx-auto p-4">
        {children}
      </main>
      {!hideNavbar && <Footer />}

      {/* Notifications */}
      {notifications.map(notification => (
        <Notification
          key={notification.id}
          message={notification.message}
          type={notification.type}
          onClose={() => removeNotification(notification.id)}
        />
      ))}
    </div>
  );
};

export default Layout;