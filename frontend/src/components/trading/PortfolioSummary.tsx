import React from 'react';
import { useTrading } from '../../hooks/useTrading';

const PortfolioSummary: React.FC = () => {
  const { portfolio, prices } = useTrading();

  // Calculate total portfolio value
  const totalValue = portfolio.balance + portfolio.holdings.reduce((sum, holding) => {
    const currentPrice = prices.prices[holding.coinSymbol]?.usd || 0;
    return sum + (holding.amount * currentPrice);
  }, 0);

  // Calculate P&L
  const totalPnL = totalValue - 10000; // Assuming initial balance 10000
  const totalPnLPercent = totalPnL / 10000 * 100;
  // const isProfit = totalPnL >= 0;

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md dark:shadow-lg border border-gray-200 dark:border-gray-700">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Portfolio Summary</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
          <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">Total Value</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">${totalValue.toFixed(2)}</p>
        </div>
        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
          <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">Cash Balance</p>
          <p className="text-2xl font-semibold text-gray-900 dark:text-white mt-1">${portfolio.balance.toFixed(2)}</p>
        </div>
        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
          <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">P&L</p>
          <div className="mt-1 space-y-1">
            <p className={`text-xl font-semibold ${totalPnL >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
              ${totalPnL.toFixed(2)}
            </p>
            <p className={`text-sm font-medium ${totalPnL >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
              {totalPnLPercent >= 0 ? '+' : ''}{totalPnLPercent.toFixed(2)}%
            </p>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Holdings</h3>
        <div className="space-y-3">
          {portfolio.holdings.map((holding) => {
            const currentPrice = prices.prices[holding.coinSymbol]?.usd || 0;
            const value = holding.amount * currentPrice;
            const pnl = (currentPrice - holding.averagePrice) * holding.amount;
            const pnlPercent = holding.averagePrice > 0 ? (pnl / (holding.amount * holding.averagePrice)) * 100 : 0;

            return (
              <div key={holding.coinSymbol} className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">{holding.coinSymbol.toUpperCase()}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {holding.amount.toFixed(4)} units @ ${holding.averagePrice.toFixed(2)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900 dark:text-white">${value.toFixed(2)}</p>
                  <p className={`text-sm font-medium ${pnl >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                    ${pnl.toFixed(2)} ({pnlPercent.toFixed(2)}%)
                  </p>
                </div>
              </div>
            );
          })}
          {portfolio.holdings.length === 0 && (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <p>No holdings yet. Start trading to build your portfolio!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PortfolioSummary;