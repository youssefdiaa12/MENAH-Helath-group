const express = require("express");
const router = express.Router();
const MotherID = require("../models/motherID");

router.post("/", async (req, res) => {
  try {
    const newID = new MotherID(req.body);
    await newID.save();
    res.status(201).json(newID);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
