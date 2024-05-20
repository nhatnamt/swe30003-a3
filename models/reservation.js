const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
    // id: {
    //     type: Number,
    //     required: true
    // },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        //required: true
    },
    time: {
        type: String,
        //required: true
    },
    guests: {
        type: Number,
        required: true
    },
    message: {
        type: String,
        //required: true
    },
    });

const Reservation = mongoose.model('Reservation', reservationSchema);
module.exports = Reservation;