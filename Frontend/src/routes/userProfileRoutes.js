const express = require("express");
const router = express.Router();
const UserProfile = require("../models/UserProfile");

// Create a new user profile
router.post("/create-profile", async (req, res) => {
console.log("➡️ Received profile data:", req.body);
  try {
const userData = { ...req.body };

if (userData.profileType === "Nurse") {
  userData.privileges = {
    canAccessAll: true,
    canAddRecord: true,
    canSearchRecord: true,
    canVerifyEBM: true,
    canCreateVerificationCode: true,
    canApproveUsers: false,
    canDeleteRecord: false
  };
}
else if (userData.profileType === "Admin") {
  userData.privileges = {
    canApproveUsers: true,
    canAccessAll: true,
    canDeleteRecord: true,
    canSearchRecord: true,
    canCreateProfile: false,
    canViewNurseHistory: true,
    canViewParentHistory: true,
    canViewVerificationErrors: true
  };
}
else if (userData.profileType === "Parent") {
  userData.privileges = {
    canViewMilkStorageTables: true,
    canReceiveMilkTips: false // future option
  };
}
const newUser = new UserProfile(userData);
    await newUser.save();
    res.status(201).json({ success: true, message: "Profile created successfully" });
  } catch (error) {
    console.error("Error creating profile:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get all pending profiles (for admin approval)
router.get("/pending-profiles", async (req, res) => {
  try {
    const pending = await UserProfile.find({ status: "Pending" });
    res.json(pending);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Approve a user profile
router.post("/approve-profile/:id", async (req, res) => {
  try {
    await UserProfile.findByIdAndUpdate(req.params.id, { status: "Active" });
    res.json({ success: true, message: "User approved" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
