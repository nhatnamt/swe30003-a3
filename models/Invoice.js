const mongoose = require('mongoose');
const Order = require('./order');
const orderSchema = Order.schema;

// Invoice schema
const invoiceSchema = new mongoose.Schema({
    invoiceID: {
        type: String,
        required: true,
        unique: true
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    customerName: {
        type: String,
    },
    customerEmail: {
        type: String,
    },
    customerPhone: {
        type: String,
    },
    orders: {
        type: [orderSchema],
        required: true
    },
    gst: {
        type: Number,
        default: 0,
        required: true
    },
    subtotal: {
        type: Number,
        default: 0,
        required: true
    },
    totalPayable: {
        type: Number,
        default: 0,
        required: true
    },
    amountPaid: {
        type: Number,
        default: 0
    },
    message: {
        type: String,
    },
    status: {
        type: String,
        default: 'Unpaid',
        required: true
    }
});

// Method to calculate subtotal
invoiceSchema.methods.calculateSubtotal = function() {
    let subtotal = 0;
    const orders = this.orders;

    for (const order of orders) {
        subtotal += order.totalAmount;
    }

    this.subtotal = subtotal;
};

// Method to calculate GST
invoiceSchema.methods.calculateGST = function() {
    const gstRate = 0.1; // Assuming GST rate is 10%
    this.gst = this.subtotal * gstRate;
};

// Method to calculate total payable
invoiceSchema.methods.calculateTotalPayable = function() {
    this.totalPayable = this.subtotal + this.gst;
};

// Method to calculate totals
invoiceSchema.methods.calculateTotals = function() {
    this.calculateSubtotal();
    this.calculateGST();
    this.calculateTotalPayable();
};

module.exports = mongoose.model('Invoice', invoiceSchema);
