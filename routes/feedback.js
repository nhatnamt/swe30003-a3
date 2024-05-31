const express = require('express');
const router = express.Router();
const Feedback = require('../models/feedback');

class FeedbackController {
    constructor() {
        this.router = express.Router();
        this.initializeRoutes();
    }
    
    initializeRoutes() {
        this.router.post('/', this.createFeedback.bind(this));
        this.router.get('/', this.getFeedback.bind(this));
    }
    
    async createFeedback(req, res) {
        try {
        console.log(req.body);
        const feedback = new Feedback(req.body);
        await feedback.save();
        res.status(201).json(feedback);
        } 
        catch (error) {
        res.status(400).json({ message: error.message });
        }
    }
    
    async getFeedback(req, res) {
        try {
        const feedback = await Feedback.find();
        res.send(feedback);
        } 
        catch (error) {
        res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new FeedbackController().router;