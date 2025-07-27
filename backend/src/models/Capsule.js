import mongoose from 'mongoose';

const capsuleSchema = new mongoose.Schema({
  warehouseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Warehouse',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  section: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['available', 'booked', 'maintenance'],
    default: 'available'
  },
  isColdStorage: {
    type: Boolean,
    default: false
  },
  size: {
    width: Number,
    depth: Number,
    height: Number
  },
  capacity: Number,
  maxWeight: Number,
  pricePerDay: {
    type: Number,
    required: true
  },
  position: {
    x: Number,
    y: Number
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});
export const Capsule = mongoose.model('Capsule', capsuleSchema);
