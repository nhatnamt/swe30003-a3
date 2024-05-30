const express = require('express');
const MenuItem = require('../models/menuItem');

class MenuController {
  constructor() {
    this.router = express.Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.post('/', this.createMenuItem.bind(this));
    this.router.get('/', this.getAllMenuItems.bind(this));
  }

  async createMenuItem(req, res) {
    try {
      console.log(req.body);
      const item = new MenuItem(req.body);
      console.log(item);
      await item.save();
      res.status(201).json(item);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async getAllMenuItems(req, res) {
    try {
      const items = await MenuItem.find();
      res.send(items);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new MenuController().router;