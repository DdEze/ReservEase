const mongoose = require('mongoose');

const spaceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: String,
  capacity: Number,
  description: String,
  available: { type: Boolean, default: true }
});

module.exports = mongoose.model('Space', spaceSchema);