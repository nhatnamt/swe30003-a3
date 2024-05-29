const mongoose = require('mongoose');
const orderItem = require('./orderItem');
const OrderItemSchema = orderItem.schema;

const orderSchema = new mongoose.Schema({
    orderID: {
        type: String,
        required: true
    },
    tableNumber: {
        type: Number,
        required: true
    },
    orderItems: {
        type: [OrderItemSchema],
        required: true
    },
    status: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    totalAmount: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Order', orderSchema);