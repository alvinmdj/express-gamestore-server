const mongoose = require('mongoose');

const transactionSchema = mongoose.Schema({
  topUpHistory: {
    gameName: { type: String, required: [true, 'Game name is required'] },
    category: { type: String, required: [true, 'Category is required'] },
    thumbnail: { type: String },
    coinName: { type: String, required: [true, 'Coin name is required'] },
    coinQuantity: { type: Number, required: [true, 'Coin quantity is required'] },
    price: { type: Number, required: [true, 'Price is required'] },
  },
  paymentHistory: {
    name: { type: String, required: [true, 'Name is required'] },
    type: { type: String, required: [true, 'Payment type is required'] },
    bankName: { type: String, required: [true, 'Bank name is required'] },
    accountNumber: { type: String, required: [true, 'Account number is required'] },
  },
  name: {
    type: String,
    minlength: [3, 'Name must be at least 3 characters'],
    maxlength: [225, 'Name must be less than 225 characters'],
    required: [true, 'Name is required'],
  },
  userAccount: {
    type: String,
    minlength: [3, 'Name must be at least 3 characters'],
    maxlength: [225, 'Name must be less than 225 characters'],
    required: [true, 'Account name is required'],
  },
  tax: {
    type: Number,
    default: 0,
  },
  value: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    enum: ['pending', 'success', 'failed'],
    default: 'pending',
  },
  player: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Player',
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  },
  voucherTopUp: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Voucher',
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  userHistory: {
    name: { type: String, required: [true, 'Player name is required'] },
    phoneNumber: {
      type: Number,
      required: [true, 'Phone number is required'],
      minlength: [9, 'Phone number must be at least 9 characters'],
      maxlength: [13, 'Phone number must be less than 13 characters'],
    },
  },
}, { timestamps: true });

module.exports = mongoose.model('Transaction', transactionSchema);
