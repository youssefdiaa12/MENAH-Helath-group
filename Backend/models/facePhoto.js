const mongoose = require("mongoose");

const facePhotoSchema = new mongoose.Schema({
  babyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Baby",
    required: true,
  },
  photoPath: {
    type: String,
    required: true,
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("FacePhoto", facePhotoSchema);
