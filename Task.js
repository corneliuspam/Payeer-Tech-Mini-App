const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: String,
  amount: Number,
  approved: { type: Boolean, default: false },
  submissions: [{
    userId: String,
    approved: { type: Boolean, default: false }
  }]
});

module.exports = mongoose.model('Task', taskSchema);