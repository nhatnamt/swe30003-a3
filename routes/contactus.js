const express = require('express');
const router = express.Router();
const Feedback = require('../models/feedback');

// Create -----------------------------------------------
router.post('/', async (req, res) => {
    console.log(req.body);
    try {
      const feedback = new Feedback(req.body);
      await feedback.save();
      res.status(201).json(feedback);
    } 
    catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

// Read ------------------------------------------------
// get all feedback
router.get('/', async (req, res) => {
    try {
      const feedback = await Feedback.find();
      res.send(feedback);
    } 
    catch (error) {
      res.status(500).json({ message: error.message })
    }});

// Update -----------------------------------------------
// update by id
router.patch('/:id', async (req, res) => {
    try {
      const feedback = await Feedback.findById(req.params.id);
      if (!feedback)
          return res.status(404).json({ message: 'Feedback not found' });
      Object.assign(feedback, req.body);
      await feedback.save();
      res.send(feedback);
    } 
    catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  // Delete -----------------------------------------------
  // delete by id
  router.delete('/:id', async (req, res) => {
    try {
      const feedback = await Feedback.findById(req.params.id);
      if (!feedback)
          return res.status(404).json({ message: 'Feedback not found' });
      await feedback.delete();
      res.status(204).json();
    } 
    catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  // Routes -----------------------------------------------
  module.exports = router;