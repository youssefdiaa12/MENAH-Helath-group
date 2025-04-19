const mongoose = require("mongoose");

const parentSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  relationToBaby: {
    type: String,
    enum: ["Mother", "Father", "Guardian"],
    required: true,
  },
  nationalID: {
    type: String,
    required: true,
    unique: true,
  },
  contactNumber: {
    type: String,
  },
  email: {
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

const Parent = mongoose.model("Parent", parentSchema);
module.exports = Parent;
