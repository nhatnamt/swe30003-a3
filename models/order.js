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

// Method to calculate total amount
orderSchema.methods.calculateTotalAmount = function() {
    let totalAmount = 0;
    const orderItems = this.orderItems;

    for (const item of orderItems) {
        totalAmount += item.price * item.quantity;
    }

    this.totalAmount = totalAmount;
};

module.exports = mongoose.model('Order', orderSchema);