const express = require('express');
const router = express.Router();
const Order = require('../models/order');
const OrderItem = require('../models/orderItem');
const MenuItem = require('../models/menuItem');


// Create -----------------------------------------------
router.post('/', async (req, res) => {
    try {
      const { items } = req.body; // items is an array of objects { menuItemId, quantity }
      const orderItems = [];
  
      for (const item of items) {
        const menuItem = await MenuItem.findById(item.menuItemId);
        if (!menuItem) {
          return res.status(400).json({ message: 'Invalid menu item' });
        }
  
        const orderItem = new OrderItem({
          menuItem: menuItem._id,
          quantity: item.quantity,
          amount: menuItem.price * item.quantity, // assuming MenuItem has a price field
        });
  
        await orderItem.save();
        orderItems.push(orderItem);
      }
  
      const order = new Order({
        items: orderItems,
      });
  
      await order.save();
  
      res.status(201).json({ message: 'Order created successfully', order });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  });

// Read ------------------------------------------------

// Update -----------------------------------------------

// Delete -----------------------------------------------