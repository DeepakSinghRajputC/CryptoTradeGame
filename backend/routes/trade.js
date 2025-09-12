import express from 'express';
import User from '../models/User.js';
import Transaction from '../models/Transaction.js';
import Portfolio from '../models/Portfolio.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// Buy order
router.post('/buy', verifyToken, async (req, res) => {
  try {
    const { coinSymbol, amount, price } = req.body;
    const userId = req.user.id;

    const user = await User.findById(userId);
    const cost = amount * price;

    if (user.profileStats.balance < cost) {
      return res.status(400).json({ message: 'Insufficient balance' });
    }

    // Deduct balance
    user.profileStats.balance -= cost;
    user.profileStats.totalTrades += 1;
    await user.save();

    // Update portfolio
    let portfolio = await Portfolio.findOne({ user: userId });
    if (!portfolio) {
      portfolio = new Portfolio({ user: userId, holdings: [] });
    }

    const holdingIndex = portfolio.holdings.findIndex(h => h.coinSymbol === coinSymbol);
    if (holdingIndex !== -1) {
      const holding = portfolio.holdings[holdingIndex];
      const newAmount = holding.amount + amount;
      const newAvg = (holding.amount * holding.averagePrice + amount * price) / newAmount;
      holding.amount = newAmount;
      holding.averagePrice = newAvg;
    } else {
      portfolio.holdings.push({ coinSymbol, amount, averagePrice: price });
    }

    portfolio.updatedAt = new Date();
    await portfolio.save();

    // Save transaction
    const transaction = new Transaction({
      user: userId,
      coinSymbol,
      amount,
      type: 'buy',
      price,
    });
    await transaction.save();

    res.json({ message: 'Buy order placed successfully', transaction });
  } catch (error) {
    console.error('Buy order error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Sell order
router.post('/sell', verifyToken, async (req, res) => {
  try {
    const { coinSymbol, amount, price } = req.body;
    const userId = req.user.id;

    const portfolio = await Portfolio.findOne({ user: userId });
    if (!portfolio) {
      return res.status(400).json({ message: 'No portfolio found' });
    }

    const holdingIndex = portfolio.holdings.findIndex(h => h.coinSymbol === coinSymbol);
    if (holdingIndex === -1 || portfolio.holdings[holdingIndex].amount < amount) {
      return res.status(400).json({ message: 'Insufficient holdings' });
    }

    const holding = portfolio.holdings[holdingIndex];
    const realizedPnL = (price - holding.averagePrice) * amount;

    // Update user balance and stats
    const user = await User.findById(userId);
    user.profileStats.balance += amount * price;
    user.profileStats.totalTrades += 1;
    // For winRate, assume we add a profitableTrades field
    // For simplicity, if realizedPnL > 0, increment
    if (!user.profileStats.profitableTrades) user.profileStats.profitableTrades = 0;
    if (realizedPnL > 0) user.profileStats.profitableTrades += 1;
    user.profileStats.winRate = (user.profileStats.profitableTrades / user.profileStats.totalTrades) * 100;
    await user.save();

    // Update holdings
    holding.amount -= amount;
    if (holding.amount === 0) {
      portfolio.holdings.splice(holdingIndex, 1);
    }
    portfolio.updatedAt = new Date();
    await portfolio.save();

    // Save transaction
    const transaction = new Transaction({
      user: userId,
      coinSymbol,
      amount,
      type: 'sell',
      price,
    });
    await transaction.save();

    res.json({ message: 'Sell order placed successfully', transaction, realizedPnL });
  } catch (error) {
    console.error('Sell order error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get portfolio
router.get('/portfolio', verifyToken, async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne({ user: req.user.id }).populate('user', 'email name');
    res.json(portfolio || { holdings: [] });
  } catch (error) {
    console.error('Get portfolio error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get transaction history
router.get('/transactions', verifyToken, async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user.id }).sort({ timestamp: -1 });
    res.json(transactions);
  } catch (error) {
    console.error('Get transactions error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;