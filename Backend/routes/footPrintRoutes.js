const express = require("express");
const router = express.Router();
const FootPrint = require("../models/footPrint");

router.post("/", async (req, res) => {
  try {
    const newRecord = new FootPrint(req.body);
    await newRecord.save();
    res.status(201).json(newRecord);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
