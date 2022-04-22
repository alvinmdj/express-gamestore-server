const mongoose = require('mongoose');

const nominalSchema = mongoose.Schema({
  coinQuantity: {
    type: Number,
    default: 0,
  },
  coinName: {
    type: String,
    required: [true, 'Coin name is required'],
  },
  price: {
    type: Number,
    default: 0,
  },
}, { timestamps: true });

module.exports = mongoose.model('Nominal', nominalSchema);
