const User = require('../models/User');
const Task = require('../models/Task');
const Announcement = require('../models/Announcement');
const Withdrawal = require('../models/Withdrawal');

exports.registerUser = async (req, res) => {
  const { telegramId, username, profilePic, referralCode } = req.body;
  let user = await User.findOne({ telegramId });
  if(user) return res.json({ success: true, message: "User already exists" });

  user = new User({ telegramId, username, profilePic, referralCode });
  await user.save();
  res.json({ success: true, message: "User registered" });
};

exports.getBalance = async (req, res) => {
  const { telegramId } = req.params;
  const user = await User.findOne({ telegramId });
  if(user) return res.json({ success: true, balance: user.balance });
  res.status(404).json({ success: false, message: "User not found" });
};

exports.getTasks = async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
};

exports.getAnnouncements = async (req, res) => {
  const announcements = await Announcement.find().sort({ createdAt: -1 });
  res.json(announcements);
};

exports.withdrawRequest = async (req, res) => {
  const { telegramId, amount, bankName, accountNumber, accountName } = req.body;
  const withdrawal = new Withdrawal({ userId: telegramId, amount, bankName, accountNumber, accountName });
  await withdrawal.save();
  res.json({ success: true, message: "Withdrawal requested" });
};