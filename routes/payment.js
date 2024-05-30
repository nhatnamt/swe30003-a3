const express = require('express');
const router = express.Router();
const Payment = require('../models/reservation');

// Create -----------------------------------------------
router.post('/', async (req, res) => {
  console.log(req.body);
  try {
    const payment = new Payment(req.body);
    await payment.save();
    res.status(201).json(payment);
  } 
  catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Read ------------------------------------------------
// get all reservations
router.get('/', async (req, res) => {
  try {
    const payment = await Payment.find();
    res.send(payment);
  } 
  catch (error) {
    res.status(500).json({ message: error.message })
  }});

// get reservation by name
router.get('/:name', async (req, res) => {
  try {
    const payment = await Payment.find({ name: req.params.name });
    if (!payment)
        return res.status(404).json({ message: 'Reservation not found' });
    res.send(payment);
  } 
  catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update -----------------------------------------------
// update by id
router.patch('/:id', async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id);
    if (!payment)
        return res.status(404).json({ message: 'Reservation not found' });
    Object.assign(payment, req.body);
    await payment.save();
    res.send(payment);
  } 
  catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete -----------------------------------------------
// delete by id
router.delete('/:id', async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id);
    if (!payment)
        return res.status(404).json({ message: 'Reservation not found' });
    await payment.delete();
    res.status(204).json();
  } 
  catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Routes -----------------------------------------------
module.exports = router;