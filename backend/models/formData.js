const mongoose = require('mongoose');

const formDataSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  aadharcard: {
    type: String,
    required: true,
  },
  fingerprintCaptured: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('FormData', formDataSchema);
