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
    this.router.get('/', this.getInvoices.bind(this));
    this.router.patch('/:id', this.updateInvoice.bind(this));
    this.router.delete('/:id', this.deleteInvoice.bind(this));
  }
  
  async createInvoice(req, res) {
    try{
      //console.log(req.body);
      const order = await Order.find({orderID: req.body.orderNumber});
      
      //console.log(order);
      const invoiceID = await Invoice.countDocuments()+1;
      const invoice = new Invoice({
        invoiceID: invoiceID,
        date: req.body.date,
        time: req.body.time,
        customerName: req.body.customerName,
        customerEmail: req.body.customerEmail,
        customerPhone: req.body.customerPhone,
        orders: order,
        message: req.body.message,
      });
      invoice.calculateTotals();
      console.log(invoice);

      await invoice.save();
      res.status(201).json({ message: 'Invoice created successfully', invoice });
    }
    catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async getInvoices(req, res) {
    try {
      const invoices = await Invoice.find();
      res.json(invoices);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async updateInvoice(req, res) {
    try {
      console.log(req.body);
      const { paymentAmount } = req.body;
      // find invoice, add payment amount to amountPaid, update status
      const invoice = await Invoice.findOne({invoiceID: req.params.id});
      if (!invoice)
        return res.status(404).json({ message: 'Invoice not found' });
      console.log(invoice);
      invoice.amountPaid += Number(paymentAmount);
      invoice.status = invoice.amountPaid >= invoice.totalPayable ? 'Paid' : 'Unpaid';
      await invoice.save();

      res.json(invoice);

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async deleteInvoice(req, res) {
    try {
      await Invoice.deleteOne({invoiceID: req.params.id});
      res.json({ message: 'Invoice deleted successfully' });
    }
    catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }  
}




module.exports = new InvoiceController().router;