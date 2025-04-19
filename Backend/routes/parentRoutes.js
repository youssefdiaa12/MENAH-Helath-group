const express = require("express");
const router = express.Router();
const Parent = require("../models/parent");

// Create a new parent profile
router.post("/", async (req, res) => {
  try {
    const newParent = new Parent(req.body);
    const savedParent = await newParent.save();
    res.status(201).json(savedParent);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all parent profiles
router.get("/", async (req, res) => {
  try {
    const parents = await Parent.find();
    res.json(parents);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a specific parent profile by ID
router.get("/:id", async (req, res) => {
  try {
    const parent = await Parent.findById(req.params.id);
    if (!parent) return res.status(404).json({ error: "Parent not found" });
    res.json(parent);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a parent profile by ID
router.put("/:id", async (req, res) => {
  try {
    const updated = await Parent.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a parent profile by ID
router.delete("/:id", async (req, res) => {
  try {
    await Parent.findByIdAndDelete(req.params.id);
    res.json({ message: "Parent profile deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
