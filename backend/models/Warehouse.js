const mongoose = require('mongoose');

const warehouseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  location: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  reviewCount: {
    type: Number,
    default: 0
  },
  pricePerMonth: {
    type: Number,
    required: true
  },
  features: [{
    type: String
  }],
  imageUrl: String,
  images: [{
    type: String
  }],
  availability: {
    type: String,
    enum: ['available', 'limited', 'waitlist'],
    default: 'available'
  },
  coordinates: {
    lat: Number,
    lng: Number
  },
  totalSlots: {
    type: Number,
    required: true
  },
  availableSlots: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Add text index for search functionality
warehouseSchema.index({ name: 'text', location: 'text', address: 'text' });

module.exports = mongoose.model('Warehouse', warehouseSchema);



