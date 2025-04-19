const mongoose = require("mongoose");

const nurseSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  licenseNumber: {
    type: String,
    required: true,
    unique: true,
  },
  hospital: {
    type: String,
    required: true,
  },
  department: {
    type: String,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  approved: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

const Nurse = mongoose.model("Nurse", nurseSchema);
module.exports = Nurse;
