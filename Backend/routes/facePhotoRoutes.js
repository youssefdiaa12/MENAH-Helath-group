const express = require("express");
const router = express.Router();
const FacePhoto = require("../models/facePhoto");

// Upload face photo
router.post("/", async (req, res) => {
  try {
    const newPhoto = new FacePhoto(req.body);
    await newPhoto.save();
    res.status(201).json(newPhoto);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all face photos
router.get("/", async (req, res) => {
  try {
    const photos = await FacePhoto.find();
    res.json(photos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a single face photo by ID
router.get("/:id", async (req, res) => {
  try {
    const photo = await FacePhoto.findById(req.params.id);
    if (!photo) return res.status(404).json({ message: "Not found" });
    res.json(photo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a face photo by ID
router.delete("/:id", async (req, res) => {
  try {
    await FacePhoto.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
