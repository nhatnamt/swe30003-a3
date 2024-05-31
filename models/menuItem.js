const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
    },
    category: {
        type: String,
    },
    });
    
module.exports = mongoose.model('menuItem', menuItemSchema);
