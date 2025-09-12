import React, { useState, useEffect, useCallback } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useTrading } from '../../hooks/useTrading';

interface ChartDataPoint {
  time: string;
  price: number;
}

const PriceChart: React.FC = () => {
  const { prices } = useTrading();
  const [selectedCoin, setSelectedCoin] = useState('bitcoin');
  const [timeRange, setTimeRange] = useState('24h');
  const [paused, setPaused] = useState(false);
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);

  // Mock historical data - in real app, fetch from API
  const generateMockData = useCallback((coin: string, hours: number) => {
    const data: ChartDataPoint[] = [];
    const basePrice = prices.prices[coin]?.usd || 100;
    for (let i = hours; i >= 0; i--) {
      const time = new Date(Date.now() - i * 60 * 60 * 1000);
      const price = basePrice + (Math.random() - 0.5) * basePrice * 0.1; // ±5% variation
      data.push({
        time: time.toLocaleTimeString(),
        price: price,
      });
    }
    return data;
  }, [prices.prices]);


  useEffect(() => {
    const initialData = generateMockData(selectedCoin, timeRange === '24h' ? 24 : timeRange === '7d' ? 168 : 720);
    setChartData(initialData);
  }, [selectedCoin, timeRange, generateMockData]);

  useEffect(() => {
    if (!paused) {
      const newData = generateMockData(selectedCoin, timeRange === '24h' ? 24 : timeRange === '7d' ? 168 : 720);
      setChartData(newData);
    }
  }, [prices, paused, generateMockData, selectedCoin, timeRange]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Price Chart</h2>

      <div className="flex space-x-4 mb-4">
        <select
          value={selectedCoin}
          onChange={(e) => setSelectedCoin(e.target.value)}
          className="p-2 border rounded"
        >
          {Object.keys(prices.prices).map(coin => (
            <option key={coin} value={coin}>{coin.toUpperCase()}</option>
          ))}
        </select>

        <div className="flex space-x-2">
          {['1h', '24h', '7d', '30d'].map(range => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-1 rounded ${timeRange === range ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            >
              {range}
            </button>
          ))}
          <button
            onClick={() => setPaused(!paused)}
            className={`px-3 py-1 rounded ${paused ? 'bg-red-600 text-white' : 'bg-green-600 text-white'}`}
          >
            {paused ? 'Resume' : 'Pause'} Updates
          </button>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis domain={['dataMin * 0.95', 'dataMax * 1.05']} />
          <Tooltip
            formatter={(value: number) => [`$${value.toFixed(2)}`, 'Price']}
            labelFormatter={(label) => `Time: ${label}`}
          />
          <Line
            type="monotone"
            dataKey="price"
            stroke="#8884d8"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PriceChart;