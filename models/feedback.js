const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
    name: {
        type: String,
        default: 'Anonymous',
    },
    email: {
        type: String,
        default: 'Anonymous',
    },
    phone: {
        type: String,
        default: 'Anonymous',
    },
    date: {
        type: Date,
        default: Date.now,
    },
    message: {
        type: String,
    }
    });

const Feedback = mongoose.model('Feedback', feedbackSchema);
module.exports = Feedback;