const express = require('express');
const Order = require('../models/order');
const MenuItem = require('../models/menuItem');
const OrderItem = require('../models/orderItem');

class OrderController {
  constructor() {
    this.router = express.Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.post('/', this.createOrder.bind(this));
    this.router.get('/', this.getOrders.bind(this));
    this.router.get('/:status', this.getOrdersByStatus.bind(this));
    this.router.patch('/:id', this.updateOrderStatus.bind(this));
  }
    
  async createOrder(req, res) {
      try {
          console.log(req.body);
          const orderItems = [];
          const items = req.body.orderItems;

          for (const item of items) {
              const menuItems = await MenuItem.find({id: item.id});
              if (!menuItems) {
                  return res.status(400).json({ message: 'Invalid menu item' });
              }
              const menuItem = menuItems[0];
              console.log(menuItems);
              const orderItem = new OrderItem({
                  id: item.id,
                  name: menuItem.name,
                  price: menuItem.price,
                  quantity: item.quantity,
                  amount: menuItem.price * item.quantity,
                  note: item.note
              });

              //await orderItem.save();
              orderItems.push(orderItem);
          }

          const orderID = await Order.countDocuments()+1;
          const order = new Order({
              orderID: orderID,
              tableNumber: req.body.tableNumber,
              orderItems: orderItems,
              status: req.body.status,
              date: req.body.date,
          });
          order.calculateTotalAmount();

          await order.save();
          res.status(201).json({ message: 'Order created successfully', order });

      } catch (error) {
          console.error(error);
          res.status(500).json({ message: 'Internal server error' });
      }
  }

  async getOrders(req, res) {
      try {
          const orders = await Order.find();
          res.send(orders);
      } catch (error) {
          res.status(500).json({ message: error.message });
      }
  }

  async getOrdersByStatus(req, res) {
      try {
          const orders = await Order.find({ status: req.params.status });
          res.send(orders);
      } catch (error) {
          res.status(500).json({ message: error.message });
      }
  }

  async updateOrderStatus(req, res) {
      try {
          const order = await Order.findOne({ orderID: req.params.id });
          if (!order) {
              return res.status(404).json({ message: 'Order not found' });
          }
          order.status = req.body.status;
          await order.save();
          res.json({ message: 'Order updated successfully', order });
      } catch (error) {
          res.status(500).json({ message: error.message });
      }
  }
}

module.exports = new OrderController().router;