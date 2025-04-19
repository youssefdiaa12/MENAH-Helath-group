const mongoose = require("mongoose");

const motherIDSchema = new mongoose.Schema({
  motherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Mother",
    required: true,
  },
  idType: {
    type: String,
    enum: ["National ID", "Passport", "Resident ID"],
    required: true,
  },
  idNumber: {
    type: String,
    required: true,
  },
  idImagePath: {
    type: String,
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("MotherID", motherIDSchema);
