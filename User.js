const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  telegramId: { type: String, required: true, unique: true },
  username: String,
  balance: { type: Number, default: 0 },
  profilePic: String,
  referralCode: String,
  referredBy: String,
  subscriptionPaid: { type: Boolean, default: false }
});

module.exports = mongoose.model('User', userSchema);