const mongoose = require('mongoose');

const babySchema = new mongoose.Schema({
  babyName: { type: String, required: false },
  babyNameArabic: { type: String, required: false },
  babyMRN: { type: String, required: false },
  visitNumber: { type: String, required: false },
  gender: { type: String, required: false },
  birthWeight: { type: Number, required: false },
  dob: { type: Date, required: false },
  gaWeeks: { type: Number, required: false },
  gaDays: { type: Number, required: false },
  passportId: { type: String, required: false },
  personalId: { type: String, required: false },
  birthCertificateId: { type: String, required: false },
});

module.exports = mongoose.model('Baby', babySchema);