const mongoose = require("mongoose");

const userProfileSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  dateOfJoining: { type: Date, required: true },
  profilePicture: { type: String }, // Store as filename or base64 string
  mobileNumber: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profileType: { type: String, enum: ["Admin", "Nurse", "Parent"], required: true },
  verificationCode: { type: String }, // Only for Nurse
    privileges: {
    canAccessAll: { type: Boolean, default: true },
    canAddRecord: { type: Boolean, default: true },
    canSearchRecord: { type: Boolean, default: true },
    canVerifyEBM: { type: Boolean, default: true },
    canCreateVerificationCode: { type: Boolean, default: true },
    canApproveUsers: { type: Boolean, default: false },
    canDeleteRecord: { type: Boolean, default: false }
  },
  status: { type: String, enum: ["Pending", "Active", "Rejected"], default: "Pending" },
}, { timestamps: true });

module.exports = mongoose.model("UserProfile", userProfileSchema);
