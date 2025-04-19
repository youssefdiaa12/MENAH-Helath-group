const express = require('express');
const router = express.Router();
const Baby = require('../models/baby');

// ✅ Updated: Check for duplicate MRN before saving
router.post("/", async (req, res) => {
  try {
    // Check if babyMRN already exists
    const existing = await Baby.findOne({ babyMRN: req.body.babyMRN });
    if (existing) {
      return res.status(400).json({ message: "This MRN already exists." });
    }

    // Create new record
    const newBaby = new Baby({
      babyName: req.body.babyName || "",
      babyNameArabic: req.body.babyNameArabic || "",
      babyMRN: req.body.babyMRN || "",
      visitNumber: req.body.visitNumber || "",
      gender: req.body.gender || "",
      birthWeight: req.body.birthWeight,
      dob: req.body.dob ? new Date(req.body.dob) : null,
      gaWeeks: req.body.gaWeeks,
      gaDays: req.body.gaDays,
      passportId: req.body.passportId || "",
      personalId: req.body.personalId || "",
      birthCertificateId: req.body.birthCertificateId || "",
    });

    // Save to DB
    await newBaby.save();
    res.status(201).json(newBaby);
  } catch (error) {
    console.error("Save error:", error);
    res.status(500).json({ message: "Failed to save baby record." });
  }
});

module.exports = router;
