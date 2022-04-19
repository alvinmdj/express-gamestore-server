const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Category name is required'],
  },
});

module.exports = mongoose.model('Category', categorySchema);
