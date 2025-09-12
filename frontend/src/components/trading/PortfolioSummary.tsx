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

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Portfolio Summary</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <p className="text-gray-600">Total Value</p>
          <p className="text-2xl font-bold">${totalValue.toFixed(2)}</p>
        </div>
        <div>
          <p className="text-gray-600">Cash Balance</p>
          <p className="text-xl">${portfolio.balance.toFixed(2)}</p>
        </div>
        <div>
          <p className="text-gray-600">P&L</p>
          <p className={`text-xl ${totalPnL >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            ${totalPnL.toFixed(2)} ({totalPnLPercent.toFixed(2)}%)
          </p>
        </div>
      </div>
      <div className="mt-4">
        <h3 className="text-lg font-semibold mb-2">Holdings</h3>
        <div className="space-y-2">
          {portfolio.holdings.map((holding) => {
            const currentPrice = prices.prices[holding.coinSymbol]?.usd || 0;
            const value = holding.amount * currentPrice;
            const pnl = (currentPrice - holding.averagePrice) * holding.amount;
            const pnlPercent = holding.averagePrice > 0 ? (pnl / (holding.amount * holding.averagePrice)) * 100 : 0;

            return (
              <div key={holding.coinSymbol} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <div>
                  <p className="font-medium">{holding.coinSymbol.toUpperCase()}</p>
                  <p className="text-sm text-gray-600">{holding.amount.toFixed(4)} @ ${holding.averagePrice.toFixed(2)}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">${value.toFixed(2)}</p>
                  <p className={`text-sm ${pnl >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    ${pnl.toFixed(2)} ({pnlPercent.toFixed(2)}%)
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PortfolioSummary;