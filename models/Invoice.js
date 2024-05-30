const mongoose = require('mongoose');
const Order = require('../models/order');
const orderSchema = Order.schema;

// Invoice schema
const invoiceSchema = new mongoose.Schema({
    invoiceID: {
        type: String,
        required: true
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
    order: {
        type: [orderSchema],
        required: true
    },
    gst: {
        type: Number,
        required: true
    },
    subtotal: {
        type: Number,
        required: true
    },
    totalPayable: {
        type: Number,
        required: true
    },
    message: {
        type: String,
    },
});

// Method to calculate GST, subtotal, and total
invoiceSchema.methods.calculateTotals = function() {
    const gstRate = 0.1; // Assuming GST rate is 10%
    const order = order.find({
        Order_Number: this.Order_Number
    })

    let subtotal = 0;
    const orderItems = this.Order.items;

    for (const item of orderItems) {
        subtotal += item.price * item.quantity;
    }
    for (const item of order.items) {
        subtotal += item.price * item.quantity;
    }

    const gst = subtotal * gstRate;
    const totalPayable = subtotal + gst;

    this.Sub_Total = subtotal;
    this.GST = gst;
    this.Total_Payable = totalPayable;
};

// Static method to create an invoice by fetching order details
invoiceSchema.statics.createInvoiceFromOrderNumber = async function(orderNumber) {
    // Assuming you have an Order model to fetch order details
    const Order = mongoose.model('Order');
    const orderDetails = await Order.findOne({ Order_Number: orderNumber });

    if (!orderDetails) {
        throw new Error('Order not found');
    }

    const invoice = new this({
        Order_Number: orderDetails.Order_Number,
        date: new Date(),
        time: new Date().toLocaleTimeString(),
        Customer_Name: orderDetails.Customer_Name,
        Customer_Email: orderDetails.Customer_Email,
        Customer_Contact_Number: orderDetails.Customer_Contact_Number,
        Order: orderDetails,
        Total_Payable: totalPayable,
        message: 'Thank you for your purchase!'
    });

    invoice.calculateTotals();
    await invoice.save();

    return invoice;
};

const invoice = mongoose.model('invoice', InvoiceSchema);
module.exports = invoice;
