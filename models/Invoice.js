const mongoose = require('mongoose');

// Define the schema for the Invoice
const invoiceSchema = new mongoose.Schema({
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

const Invoice = mongoose.model('Invoice', invoiceSchema);
module.exports = Invoice;