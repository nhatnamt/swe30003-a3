const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
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
    Total_Payable: {
        type: Number,
        required: true
    },
    cardNumber: {
        type: String,
        required: true
    },
    cardHolderName: {
        type: String,
        required: true
    },
    expiryDate: {
        type: Date (MM/YY),
        required: true
    },
    cvv: {
        type: Number,
        required: true
    },
});