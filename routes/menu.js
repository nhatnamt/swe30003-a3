const express = require('express');
const router = express.Router();
const menuItem = require('../models/menuItem');

// Create -----------------------------------------------
router.post('/', async (req, res) => {
  try {
    console.log(req.body);
    const item = new menuItem(req.body);
    console.log(item);
    await item.save();
    res.status(201).json(item);
  } 
  catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Read ------------------------------------------------
// get all menu items
router.get('/', async (req, res) => {
  try {
    const items = await menuItem.find();
    res.send(items);
  } 
  catch (error) {
    res.status(500).json({ message: error.message })
  }});

module.exports = router;
