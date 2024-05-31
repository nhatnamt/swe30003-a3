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
    this.router.get('/:id', this.getMenuItem.bind(this));
    this.router.patch('/:id', this.updateMenuItem.bind(this));
    this.router.delete('/:id', this.deleteMenuItem.bind(this));
  }

  async createMenuItem(req, res) {
    try {
      // do
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

  async getMenuItem(req, res) {
    try {
      const item = await MenuItem.findOne({ id: req.params.id });
      if (item == null) {
        return res.status(404).json({ message: 'Cannot find menu item' });
      }
      res.json(item);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  async updateMenuItem(req, res) {
    try {
      console.log(req.body);
      const item = await MenuItem.findOne({ id: req.params.id });
      if (item == null) {
        return res.status(404).json({ message: 'Cannot find menu item' });
      }
      if (req.body.name != null) {
        item.name = req.body.name;
      }
      if (req.body.price != null) {
        item.price = req.body.price;
      }
      if (req.body.description != null) {
        item.description = req.body.description;
      }
      if (req.body.category != null) {
        item.category = req.body.category;
      }
      await item.save();
      res.json(item);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  async deleteMenuItem(req, res) {
    try {
      await MenuItem.deleteOne({ id: req.params.id });
      res.status(204).json();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new MenuController().router;