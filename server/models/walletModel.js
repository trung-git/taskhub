const mongoose = require('mongoose');

const walletSchema = new mongoose.Schema({
  amount: {
    type: Number,
    default: 0,
  },
  paymentHistory: [
    {
      action: {
        type: String,
        enum: ['withdraw', 'deposit'],
      },
      amount: {
        type: Number,
      },
      contract: {
        type: mongoose.Types.ObjectId,
        ref: 'Contract',
      },
      createdAt: {
        type: Date,
        default: () => { return new Date() }
      }
    },
  ],
});
const Wallet = mongoose.model('Wallet', walletSchema);
module.exports = Wallet;