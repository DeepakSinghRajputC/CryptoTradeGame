import React, { useState } from 'react';
import { useTrading } from '../../hooks/useTrading';

const TradeForm: React.FC = () => {
  const { prices, portfolio, executeTrade, loading } = useTrading();
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

    await executeTrade(coinSymbol, numAmount, type);
    setAmount('');
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Trade</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 mb-2">Coin</label>
          <select
            value={coinSymbol}
            onChange={(e) => setCoinSymbol(e.target.value)}
            className="w-full p-2 border rounded"
          >
            {availableCoins.map(coin => (
              <option key={coin} value={coin}>{coin.toUpperCase()}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-gray-700 mb-2">Type</label>
          <div className="flex space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                value="buy"
                checked={type === 'buy'}
                onChange={(e) => setType(e.target.value as 'buy')}
                className="mr-2"
              />
              Buy
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="sell"
                checked={type === 'sell'}
                onChange={(e) => setType(e.target.value as 'sell')}
                className="mr-2"
              />
              Sell
            </label>
          </div>
        </div>

        <div>
          <label className="block text-gray-700 mb-2">Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder={`Max: ${maxAmount.toFixed(4)}`}
            className="w-full p-2 border rounded"
            step="0.0001"
            min="0"
            max={maxAmount}
          />
          <p className="text-sm text-gray-600 mt-1">
            Current price: ${currentPrice.toFixed(2)} | Total: ${(parseFloat(amount) * currentPrice).toFixed(2)}
          </p>
        </div>

        <button
          type="submit"
          disabled={loading || !amount || parseFloat(amount) <= 0 || parseFloat(amount) > maxAmount}
          className="w-full bg-blue-600 text-white p-2 rounded disabled:bg-gray-400"
        >
          {loading ? 'Processing...' : `${type.toUpperCase()} ${coinSymbol.toUpperCase()}`}
        </button>
      </form>
    </div>
  );
};

export default TradeForm;