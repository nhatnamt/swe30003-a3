const express = require('express');
const router = express.Router();
const Reservation = require('../models/reservation');

// Create -----------------------------------------------
router.post('/', async (req, res) => {
  console.log(req.body);
  try {
    const reservation = new Reservation(req.body);
    await reservation.save();
    res.status(201).json(reservation);
  } 
  catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Read ------------------------------------------------
// get all reservations
router.get('/', async (req, res) => {
  try {
    const reservations = await Reservation.find();
    res.send(reservations);
  } 
  catch (error) {
    res.status(500).json({ message: error.message })
  }});

// get reservation by name
router.get('/:name', async (req, res) => {
  try {
    const reservation = await Reservation.find({ name: req.params.name });
    console.log(reservation);
    if (!reservation)
        return res.status(404).json({ message: 'Reservation not found' });
    res.send(reservation[0]);
  } 
  catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update -----------------------------------------------
// update by id
router.patch('/:id', async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);
    if (!reservation)
        return res.status(404).json({ message: 'Reservation not found' });
    Object.assign(reservation, req.body);
    await reservation.save();
    res.send(reservation);
  } 
  catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete -----------------------------------------------
// delete by name
router.delete('/:name', async (req, res) => {
  try {
    await Reservation.deleteOne({ name: req.params.name });
    res.status(204).json();
  } 
  catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Routes -----------------------------------------------
module.exports = router;