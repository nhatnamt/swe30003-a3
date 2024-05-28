const mongoose = require('mongoose');
const MenuItem = require('./menuItem');

const orderItemSchema = new mongoose.Schema({
    menuItem: {
        type: MenuItem,
        required: true
    },
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