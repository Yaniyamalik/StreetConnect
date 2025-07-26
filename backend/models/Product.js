const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  unit: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  location: {
    type: String,
    required: true
  },
  supplier: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['vegetables', 'fruits', 'grains', 'spices', 'oils', 'dairy']
  },
  badge: {
    text: String,
    color: String
  },
  imageUrl: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Add text index for search functionality
productSchema.index({ name: 'text', description: 'text', supplier: 'text' });

module.exports = mongoose.model('Product', productSchema);