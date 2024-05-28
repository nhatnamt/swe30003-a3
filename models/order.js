const mongoose = require('mongoose');
const OrderItem = require('./orderItem');

const orderSchema = new mongoose.Schema({
    orderItems: {
        type: [OrderItem],
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
});