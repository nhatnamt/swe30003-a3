const express = require('express');
const router = express.Router();
const Order = require('../models/order');
const MenuItem = require('../models/menuItem');
const OrderItem = require('../models/orderItem');

// const OrderItem = require('../models/orderItem');
// const MenuItem = require('../models/menuItem');


// Create -----------------------------------------------
router.post('/', async (req, res) => {
    try {
      const orderItems = [];
      const items = req.body.orderItems;
      var totalAmount = 0;

      for (const item of items) {
        const menuItems = await MenuItem.find({id: item.id});
        if (!menuItems) {
          return res.status(400).json({ message: 'Invalid menu item' });
        }

        const menuItem = menuItems[0];
        const orderItem = new OrderItem({
          id: item.id,
          name: menuItem.name,
          price: menuItem.price,
          quantity: item.quantity,
          amount: menuItem.price * item.quantity,
          note: item.note
        });
        totalAmount += orderItem.amount;

        //await orderItem.save();
        orderItems.push(orderItem);
      }

      const order = new Order({
        orderID: req.body.orderID,
        tableNumber: req.body.tableNumber,
        orderItems: orderItems,
        status: req.body.status,
        date: req.body.date,
        totalAmount: totalAmount
      });
      console.log(order);

      await order.save();
      res.status(201).json({ message: 'Order created successfully', order });

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

// Read ------------------------------------------------

// Update -----------------------------------------------

// Delete -----------------------------------------------


module.exports = router;