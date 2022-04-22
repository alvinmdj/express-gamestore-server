const mongoose = require('mongoose');

const bankSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Customer name is required'],
  },
  bankName: {
    type: String,
    required: [true, 'Bank name is required'],
  },
  accountNumber: {
    type: String,
    required: [true, 'Account number is required'],
  },
}, { timestamps: true });

module.exports = mongoose.model('Bank', bankSchema);
