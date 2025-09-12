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
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Portfolio Breakdown</h2>
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
          <Tooltip formatter={(value: number) => [`$${value.toFixed(2)}`, 'Value']} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PortfolioChart;