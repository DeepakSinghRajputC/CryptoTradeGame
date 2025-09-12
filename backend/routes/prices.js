import express from 'express';
import { getPrices } from '../services/priceService.js';

const router = express.Router();

/**
 * GET /api/prices
 * Returns current cached cryptocurrency prices with last update timestamp
 */
router.get('/', (req, res) => {
  try {
    const prices = getPrices();
    res.json(prices);
  } catch (error) {
    console.error('Error fetching prices:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;