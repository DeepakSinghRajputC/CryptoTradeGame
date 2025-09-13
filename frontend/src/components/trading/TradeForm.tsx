import React, { useState } from 'react';
import { useTrading } from '../../hooks/useTrading';

const TradeForm: React.FC = () => {
  const { prices, portfolio, executeTrade, loading, showNotification } = useTrading();
  const [coinSymbol, setCoinSymbol] = useState('bitcoin');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState<'buy' | 'sell'>('buy');

  const availableCoins = Object.keys(prices.prices);
  const currentPrice = prices.prices[coinSymbol]?.usd || 0;
  const holding = portfolio.holdings.find(h => h.coinSymbol === coinSymbol);
  const maxAmount = type === 'buy'
    ? portfolio.balance / currentPrice
    : holding?.amount || 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const numAmount = parseFloat(amount);
    if (numAmount <= 0 || numAmount > maxAmount) return;

    const result = await executeTrade(coinSymbol, numAmount, type);
    if (result.success) {
      // Show success notification
      const message = `${type.toUpperCase()} ${numAmount} ${coinSymbol.toUpperCase()} at $${result.price?.toFixed(2)} - Total: $${result.total?.toFixed(2)}`;
      showNotification(message, 'success');
    } else {
      // Show error notification
      showNotification(result.error || 'Trade failed', 'error');
    }
    setAmount('');
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md dark:shadow-lg border border-gray-200 dark:border-gray-700">
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Trade</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">Coin</label>
          <select
            value={coinSymbol}
            onChange={(e) => setCoinSymbol(e.target.value)}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
          >
            {availableCoins.map(coin => (
              <option key={coin} value={coin} className="bg-white dark:bg-gray-700">{coin.toUpperCase()}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">Type</label>
          <div className="flex space-x-6">
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                value="buy"
                checked={type === 'buy'}
                onChange={(e) => setType(e.target.value as 'buy')}
                className="mr-3 text-blue-600 focus:ring-blue-500 dark:bg-gray-700"
              />
              <span className="text-gray-700 dark:text-gray-300 font-medium">Buy</span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                value="sell"
                checked={type === 'sell'}
                onChange={(e) => setType(e.target.value as 'sell')}
                className="mr-3 text-red-600 focus:ring-red-500 dark:bg-gray-700"
              />
              <span className="text-gray-700 dark:text-gray-300 font-medium">Sell</span>
            </label>
          </div>
        </div>

        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder={`Max: ${maxAmount.toFixed(4)}`}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            step="0.0001"
            min="0"
            max={maxAmount}
          />
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            Current price: <span className="font-semibold text-green-600 dark:text-green-400">${currentPrice.toFixed(2)}</span> |
            Total: <span className="font-semibold text-blue-600 dark:text-blue-400">${(parseFloat(amount) * currentPrice).toFixed(2)}</span>
          </p>
        </div>

        <button
          type="submit"
          disabled={loading || !amount || parseFloat(amount) <= 0 || parseFloat(amount) > maxAmount}
          className={`w-full p-3 rounded-lg font-semibold text-white transition-all duration-200 ${
            type === 'buy'
              ? 'bg-green-600 hover:bg-green-700 disabled:bg-gray-400 dark:disabled:bg-gray-600'
              : 'bg-red-600 hover:bg-red-700 disabled:bg-gray-400 dark:disabled:bg-gray-600'
          } disabled:cursor-not-allowed focus:ring-2 focus:ring-offset-2 ${
            type === 'buy' ? 'focus:ring-green-500' : 'focus:ring-red-500'
          }`}
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </div>
          ) : (
            `${type.toUpperCase()} ${coinSymbol.toUpperCase()}`
          )}
        </button>
      </form>
    </div>
  );
};

export default TradeForm;