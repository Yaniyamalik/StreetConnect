const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  warehouseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Warehouse',
    required: true
  },
  capsuleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Capsule',
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  options: {
    coldStorage: {
      type: Boolean,
      default: false
    },
    humidityControl: {
      type: Boolean,
      default: false
    },
    insurance: {
      type: Boolean,
      default: false
    }
  },
  accessSchedule: {
    type: String,
    enum: ['24-7', 'business-hours', 'custom'],
    default: '24-7'
  },
  customAccessHours: {
    type: Object
  },
  notes: String,
  totalPrice: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled', 'completed'],
    default: 'pending'
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'refunded'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Booking', bookingSchema);