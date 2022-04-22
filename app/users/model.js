const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email address is required'],
  },
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  phoneNumber: {
    type: String,
    required: [true, 'phoneNumber is required'],
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'admin',
  },
  status: {
    type: String,
    enum: ['Y', 'N'],
    default: 'Y',
  },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
