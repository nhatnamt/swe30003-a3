const mongoose = require('mongoose');

// Define the schema for the Invoice
const InvoiceSchema = new mongoose.Schema({
    Order_Number: {
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
    Customer_Name: {
        type: String,
    },
    Customer_Email: {
        type: String,
    },
    Customer_Contact_Number: {
        type: String,
    },
    Order: {
        type: Object,
        required: true
    },
    GST: {
        type: Number,
        required: true
    },
    Sub_Total: {
        type: Number,
        required: true
    },
    Total_Payable: {
        type: Number,
        required: true
    },
    message: {
        type: String,
    },
});

// Define a method to calculate GST, subtotal, and total
InvoiceSchema.methods.calculateTotals = function() {
    const gstRate = 0.1; // Assuming GST rate is 10%
    const order = this.Order;

    let subtotal = 0;
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
InvoiceSchema.statics.createInvoiceFromOrderNumber = async function(orderNumber) {
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
        message: 'Thank you for your purchase!'
    });

    invoice.calculateTotals();
    await invoice.save();

    return invoice;
};

const Invoice = mongoose.model('Invoice', InvoiceSchema);
module.exports = Invoice;
