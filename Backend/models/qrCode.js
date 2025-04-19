const mongoose = require("mongoose");

const qrCodeSchema = new mongoose.Schema({
  babyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Baby",
    required: true,
  },
  qrCodeData: {
    type: String,
    required: true,
  },
  qrCodeImagePath: {
    type: String,
    required: true,
  },
  generatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("QRCode", qrCodeSchema);
