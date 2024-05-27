const mongoose = require('mongoose');

const InvoiceSchema = new mongoose.Schema({
    // id: {
    //     type: Number,
    //     required: true
    // },
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
        //required: true
    },
    Customer_Email: {
        type: String,
        //required: true
    },
    Customer_Contact_Number: {
        type: String,
        //required: true
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
        //required: true
    },
    });

const Invoice = mongoose.model('Invoice', InvoiceSchema);
module.exports = Invoice;