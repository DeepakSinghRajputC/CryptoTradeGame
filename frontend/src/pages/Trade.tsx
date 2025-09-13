import React from 'react';
import TradeForm from '../components/trading/TradeForm';

const Trade: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Trade Crypto</h1>
        <p className="text-gray-600 dark:text-gray-400">Buy and sell cryptocurrencies with virtual money</p>
      </div>

      <div className="max-w-2xl mx-auto">
        <TradeForm />
      </div>
    </div>
  );
};

export default Trade;