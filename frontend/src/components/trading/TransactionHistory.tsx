import React from 'react';
import { useTrading } from '../../hooks/useTrading';
import type { Transaction } from '../../contexts/TradingContextValue';

const TransactionHistory: React.FC = () => {
  const { transactions } = useTrading();

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Transaction History</h2>
      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-2 text-left">Coin</th>
              <th className="px-4 py-2 text-left">Type</th>
              <th className="px-4 py-2 text-left">Amount</th>
              <th className="px-4 py-2 text-left">Price</th>
              <th className="px-4 py-2 text-left">Total</th>
              <th className="px-4 py-2 text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx: Transaction, index: number) => (
              <tr key={index} className="border-t">
                <td className="px-4 py-2">{tx.coinSymbol.toUpperCase()}</td>
                <td className={`px-4 py-2 font-medium ${tx.type === 'buy' ? 'text-green-600' : 'text-red-600'}`}>
                  {tx.type.toUpperCase()}
                </td>
                <td className="px-4 py-2">{tx.amount.toFixed(4)}</td>
                <td className="px-4 py-2">${tx.price.toFixed(2)}</td>
                <td className="px-4 py-2">${(tx.amount * tx.price).toFixed(2)}</td>
                <td className="px-4 py-2">{new Date(tx.timestamp).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {transactions.length === 0 && (
          <p className="text-center text-gray-500 py-4">No transactions yet</p>
        )}
      </div>
    </div>
  );
};

export default TransactionHistory;