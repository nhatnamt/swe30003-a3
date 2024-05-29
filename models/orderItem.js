const mongoose = require('mongoose');
const MenuItemSchema = require('./menuItem');

var orderItemSchema = new mongoose.Schema({
  quantity: {
    type: Number,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  note: {
    type: String,
    default: ''
  }
});

MenuItemSchema.discriminator('orderItem', orderItemSchema);
module.exports = mongoose.model('orderItem');