const express = require("express");
const router = express.Router();
const Nurse = require("../models/nurse");

// Create a new nurse profile
router.post("/", async (req, res) => {
  try {
    const nurse = new Nurse(req.body);
    await nurse.save();
    res.status(201).json(nurse);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all nurse profiles
router.get("/", async (req, res) => {
  try {
    const nurses = await Nurse.find();
    res.json(nurses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Approve a nurse
router.patch("/:id/approve", async (req, res) => {
  try {
    const nurse = await Nurse.findByIdAndUpdate(
      req.params.id,
      { approved: true },
      { new: true }
    );
    if (!nurse) {
      return res.status(404).json({ message: "Nurse not found" });
    }
    res.json(nurse);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a nurse profile
router.delete("/:id", async (req, res) => {
  try {
    const nurse = await Nurse.findByIdAndDelete(req.params.id);
    if (!nurse) {
      return res.status(404).json({ message: "Nurse not found" });
    }
    res.json({ message: "Nurse deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
