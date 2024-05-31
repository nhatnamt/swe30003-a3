const express = require('express');
const Invoice = require('../models/Invoice');
const Order = require('../models/order');

class InvoiceController {
  constructor() {
    this.router = express.Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.post('/', this.createInvoice.bind(this));
    //this.router.get('/', this.getInvoices.bind(this));
    //this.router.get('/:id', this.getInvoiceById.bind(this));
    //this.router.patch('/:id', this.updateInvoice.bind(this));
    //this.router.delete('/:id', this.deleteInvoice.bind(this));
  }
  
  async createInvoice(req, res) {
    try{
      console.log(req.body);
    }
    catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}


module.exports = new InvoiceController().router;