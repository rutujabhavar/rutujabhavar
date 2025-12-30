const mongoose = require('mongoose');

const DriverSchema = new mongoose.Schema({
  driverId: { type: String, required: true, unique: true },
  location: {
    type: { type: String, enum: ['Point'], default: 'Point' },
    coordinates: { type: [Number], default: [0,0] } // [lon, lat]
  },
  status: { type: String, enum: ['available','on_trip','offline'], default: 'available' },
  idleSeconds: { type: Number, default: 0 },
  recentAcceptRate: { type: Number, default: 0.9 },
  recentAssignedCount: { type: Number, default: 0 },
  updatedAt: { type: Date, default: Date.now }
});

// Create 2dsphere index if using geospatial queries in Mongo
DriverSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Driver', DriverSchema);