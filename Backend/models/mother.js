const mongoose = require('mongoose');

const motherSchema = new mongoose.Schema({
  motherName: { type: String, required: true },
  motherID: { type: String, required: true, unique: true },
  nationality: { type: String },
  contactNumber: { type: String },
  email: { type: String },
  address: { type: String },
  dateOfBirth: { type: Date },
  bloodGroup: { type: String },
  medicalHistory: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Mother', motherSchema);
