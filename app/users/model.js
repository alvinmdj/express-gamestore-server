const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email address is required'],
  },
  name: {
    type: String,
    required: [true, 'Name is required'],
    minlength: [3, 'Name must be at least 3 characters'],
    maxlength: [225, 'Name must be less than or equal to 225 characters'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [7, 'Password must be at least 7 characters'],
    maxlength: [225, 'Password must be less than or equal to 225 characters'],
  },
  phoneNumber: {
    type: String,
    required: [true, 'phoneNumber is required'],
    minlength: [9, 'Phone number must be at least 9 characters'],
    maxlength: [13, 'Phone number must be less than or equal to 13 characters'],
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
