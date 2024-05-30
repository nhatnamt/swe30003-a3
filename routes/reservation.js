const express = require('express');
const router = express.Router();
const Reservation = require('../models/reservation');

class ReservationController {
  constructor() {
    this.router = express.Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.post('/', this.createReservation.bind(this));
    this.router.get('/', this.getReservations.bind(this));
    this.router.get('/:name', this.getReservationByName.bind(this));
    this.router.patch('/:id', this.updateReservation.bind(this));
    this.router.delete('/:name', this.deleteReservation.bind(this));
  }

  async createReservation(req, res) {
    try {
      console.log(req.body);
      const reservation = new Reservation(req.body);
      await reservation.save();
      res.status(201).json(reservation);
    } 
    catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async getReservations(req, res) {
    try {
      const reservations = await Reservation.find();
      res.send(reservations);
    } 
    catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getReservationByName(req, res) {
    try {
      const reservation = await Reservation.find({ name: req.params.name });
      if (!reservation)
          return res.status(404).json({ message: 'Reservation not found' });
      res.send(reservation[0]);
    } 
    catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async updateReservation(req, res) {
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
  }

  async deleteReservation(req, res) {
    try {
      await Reservation.deleteOne({ name: req.params.name });
      res.status(204).json();
    } 
    catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new ReservationController().router;