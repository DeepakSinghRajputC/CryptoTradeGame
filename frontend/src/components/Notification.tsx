import React, { useEffect, useState } from 'react';

interface NotificationProps {
  message: string;
  type: 'success' | 'error' | 'info';
  onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({ message, type, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300); // Allow fade out animation
    }, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  const getStyles = () => {
    switch (type) {
      case 'success':
        return {
          bg: 'bg-gradient-to-r from-green-500 to-green-600',
          icon: '✓',
          iconColor: 'text-green-100'
        };
      case 'error':
        return {
          bg: 'bg-gradient-to-r from-red-500 to-red-600',
          icon: '✕',
          iconColor: 'text-red-100'
        };
      default:
        return {
          bg: 'bg-gradient-to-r from-blue-500 to-blue-600',
          icon: 'ℹ',
          iconColor: 'text-blue-100'
        };
    }
  };

  const styles = getStyles();

  return (
    <div
      className={`fixed top-4 right-4 z-50 max-w-sm w-full transition-all duration-300 transform ${
        isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
      }`}
    >
      <div className={`${styles.bg} rounded-lg shadow-xl border border-white/20 backdrop-blur-sm`}>
        <div className="flex items-start p-4">
          <div className={`flex-shrink-0 w-6 h-6 rounded-full bg-white/20 flex items-center justify-center mr-3 ${styles.iconColor}`}>
            <span className="text-sm font-bold">{styles.icon}</span>
          </div>
          <div className="flex-1 text-white">
            <p className="text-sm font-medium leading-tight">{message}</p>
          </div>
          <button
            onClick={handleClose}
            className="flex-shrink-0 ml-3 text-white/70 hover:text-white transition-colors duration-200"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="bg-white/10 h-1 rounded-b-lg">
          <div className="bg-white/30 h-full rounded-b-lg animate-shrink"></div>
        </div>
      </div>
    </div>
  );
};

export default Notification;