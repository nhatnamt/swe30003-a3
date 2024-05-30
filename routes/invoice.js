const express = require('express');
const router = express.Router();
const Invoice = require('../models/invoice');
const Order = require('../models/order'); // Ensure you have an order model

// Create -----------------------------------------------
// Fetch order details and create an invoice
router.post('/create-from-order', async (req, res) => {
  const { orderId } = req.body;
  try {
    const order = await Order.findOne({ orderID: orderId });
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    const invoiceData = {
      orderID: order.orderID,
      tableNumber: order.tableNumber,
      orderItems: order.orderItems,
      status: order.status,
      date: order.date,
      totalAmount: order.totalAmount,
    };

    const invoice = new Invoice(invoiceData);
    await invoice.save();
    res.status(201).json(invoice);
  } 
  catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all invoices
router.get('/', async (req, res) => {
  try {
    const invoices = await Invoice.find();
    res.send(invoices);
  } 
  catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get invoice by name
router.get('/:name', async (req, res) => {
  try {
    const invoice = await Invoice.find({ name: req.params.name });
    if (!invoice)
      return res.status(404).json({ message: 'Invoice not found' });
    res.send(invoice);
  } 
  catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update by ID
router.patch('/:id', async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id);
    if (!invoice)
      return res.status(404).json({ message: 'Invoice not found' });
    Object.assign(invoice, req.body);
    await invoice.save();
    res.send(invoice);
  } 
  catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete by ID
router.delete('/:id', async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id);
    if (!invoice)
      return res.status(404).json({ message: 'Invoice not found' });
    await invoice.delete();
    res.status(204).json();
  } 
  catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
