import mongoose from 'mongoose';

const portfolioSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },
  holdings: [{
    coinSymbol: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    averagePrice: {
      type: Number,
      required: true,
    },
  }],
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Portfolio', portfolioSchema);