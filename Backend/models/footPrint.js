const mongoose = require("mongoose");

const footPrintSchema = new mongoose.Schema({
  babyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Baby",
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

module.exports = mongoose.model("FootPrint", footPrintSchema);
