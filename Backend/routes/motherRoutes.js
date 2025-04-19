const express = require('express');
const router = express.Router();
const Mother = require('../models/mother');

// Create new mother record
router.post('/', async (req, res) => {
  try {
    const newMother = new Mother(req.body);
    const savedMother = await newMother.save();
    res.status(201).json(savedMother);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all mothers
router.get('/', async (req, res) => {
  try {
    const mothers = await Mother.find();
    res.json(mothers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single mother by ID
router.get('/:id', async (req, res) => {
  try {
    const mother = await Mother.findById(req.params.id);
    if (!mother) return res.status(404).json({ message: 'Mother not found' });
    res.json(mother);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update mother by ID
router.put('/:id', async (req, res) => {
  try {
    const updated = await Mother.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete mother by ID
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Mother.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Mother not found' });
    res.json({ message: 'Mother deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
