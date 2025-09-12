import express, { json } from 'express';
import { connect } from 'mongoose';
import cors from 'cors';
import { config } from 'dotenv';

config();

import authRoutes from './routes/auth.js';
import tradeRoutes from './routes/trade.js';
import pricesRoutes from './routes/prices.js';
import { startPriceUpdates, getPrices } from './services/priceService.js';
import { WebSocketServer } from 'ws';

const app = express();

app.use(cors());
app.use(json());

connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
}).then(() => console.log('MongoDB connected'))
    .catch(err => console.log('MongoDB connection error:', err));

app.use('/api/auth', authRoutes);
app.use('/api/trade', tradeRoutes);
app.use('/api/prices', pricesRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Start price updates and WebSocket server
const wss = new WebSocketServer({ port: 8080 });
console.log('WebSocket server running on port 8080');

wss.on('connection', (ws) => {
  console.log('WebSocket client connected');
  // Send current prices on connection
  ws.send(JSON.stringify(getPrices()));

  ws.on('close', () => {
    console.log('WebSocket client disconnected');
  });
});

// Start price update service with WebSocket reference
startPriceUpdates(wss);