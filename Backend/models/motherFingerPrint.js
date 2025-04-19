const mongoose = require("mongoose");

const motherFingerPrintSchema = new mongoose.Schema({
  motherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Mother",
    required: true,
  },
  imagePath: {
    type: String,
    required: true,
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("MotherFingerPrint", motherFingerPrintSchema);
