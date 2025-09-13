import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import Notification from './Notification';
import { useTrading } from '../hooks/useTrading';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { notifications, removeNotification } = useTrading();

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900 transition-colors">
      <Navbar />
      <main className="flex-grow container mx-auto p-4">
        {children}
      </main>
      <Footer />

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