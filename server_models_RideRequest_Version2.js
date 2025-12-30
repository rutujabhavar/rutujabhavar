const mongoose = require('mongoose');

const RideRequestSchema = new mongoose.Schema({
  requestId: { type: String, required: true, unique: true },
  riderId: { type: String },
  origin: {
    lat: Number,
    lon: Number
  },
  destination: {
    lat: Number,
    lon: Number
  },
  seats: { type: Number, default: 1 },
  assignedDriverId: { type: String, default: null },
  status: { type: String, enum: ['pending','matched','cancelled'], default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('RideRequest', RideRequestSchema);