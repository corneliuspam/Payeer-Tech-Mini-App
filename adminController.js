const Announcement = require('../models/Announcement');
const Task = require('../models/Task');
const Withdrawal = require('../models/Withdrawal');
const User = require('../models/User');

exports.login = async (req, res) => {
  const { email, password } = req.body;
  if(email === "corneliuspam8736@gmail.com" && password === "2001@pam"){
    return res.json({ success: true, message: "Logged in" });
  }
  res.status(401).json({ success: false, message: "Invalid credentials" });
};

exports.postAnnouncement = async (req, res) => {
  const { message } = req.body;
  const announcement = new Announcement({ message });
  await announcement.save();
  res.json({ success: true, message: "Announcement posted" });
};

exports.createTask = async (req, res) => {
  const { title, amount } = req.body;
  const task = new Task({ title, amount });
  await task.save();
  res.json({ success: true, message: "Task created" });
};

exports.approveTask = async (req, res) => {
  const { userId, taskId } = req.body;
  const task = await Task.findById(taskId);
  if(task){
    task.submissions = task.submissions.map(s => {
      if(s.userId === userId) s.approved = true;
      return s;
    });
    await task.save();
    await User.findOneAndUpdate({ telegramId: userId }, { $inc: { balance: task.amount } });
    res.json({ success: true, message: "Task approved" });
  } else {
    res.status(404).json({ success: false, message: "Task not found" });
  }
};

exports.approveWithdrawal = async (req, res) => {
  const { withdrawalId } = req.body;
  const withdrawal = await Withdrawal.findById(withdrawalId);
  if(withdrawal){
    withdrawal.approved = true;
    await withdrawal.save();
    res.json({ success: true, message: "Withdrawal approved" });
  } else {
    res.status(404).json({ success: false, message: "Withdrawal not found" });
  }
};