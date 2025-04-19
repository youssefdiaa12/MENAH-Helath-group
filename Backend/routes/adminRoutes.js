const express = require("express");
const router = express.Router();
const Admin = require("../models/admin");

// Register new admin
router.post("/register", async (req, res) => {
  try {
    const newAdmin = new Admin(req.body);
    await newAdmin.save();
    res.status(201).json({ message: "Admin registered successfully", admin: newAdmin });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all admins
router.get("/", async (req, res) => {
  try {
    const admins = await Admin.find();
    res.status(200).json(admins);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Login (simple match, not hashed for now)
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username, password });
    if (!admin) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    res.status(200).json({ message: "Login successful", admin });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
