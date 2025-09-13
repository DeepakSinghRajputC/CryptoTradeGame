import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { useTrading } from '../../hooks/useTrading';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const PortfolioChart: React.FC = () => {
  const { portfolio, prices } = useTrading();

  const data = portfolio.holdings.map((holding, index) => {
    const value = holding.amount * (prices.prices[holding.coinSymbol]?.usd || 0);
    return {
      name: holding.coinSymbol.toUpperCase(),
      value,
      color: COLORS[index % COLORS.length],
    };
  });

  // Add cash balance
  data.unshift({
    name: 'Cash',
    value: portfolio.balance,
    color: '#82ca9d',
  });

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md dark:shadow-lg border border-gray-200 dark:border-gray-700">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Portfolio Breakdown</h2>
      <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
              }}
              formatter={(value: number) => [`$${value.toFixed(2)}`, 'Value']}
            />
            <Legend
              wrapperStyle={{ color: 'rgb(75 85 99)' }}
              iconType="circle"
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PortfolioChart;