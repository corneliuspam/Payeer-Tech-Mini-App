const mongoose = require('mongoose');

const withdrawalSchema = new mongoose.Schema({
  userId: String,
  amount: Number,
  bankName: String,
  accountNumber: String,
  accountName: String,
  approved: { type: Boolean, default: false }
});

module.exports = mongoose.model('Withdrawal', withdrawalSchema);