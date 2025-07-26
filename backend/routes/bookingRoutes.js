const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const protect = require('../middleware/authMiddleware');

// Create a new booking
router.post('/', protect, bookingController.createBooking);

// Get bookings by user
router.get('/user/:userId', protect, bookingController.getBookingsByUser);

// Cancel booking
router.post('/:id/cancel', protect, bookingController.cancelBooking);

module.exports = router;

// server/controllers/capsuleController.js
const Capsule = require('../models/Capsule');
const Warehouse = require('../models/Warehouse');

// Get all capsules for a warehouse
exports.getCapsules = async (req, res) => {
  try {
    const warehouseId = req.params.warehouseId;
    
    // Check if warehouse exists
    const warehouse = await Warehouse.findById(warehouseId);
    if (!warehouse) {
      return res.status(404).json({ message: 'Warehouse not found' });
    }
    
    const capsules = await Capsule.find({ warehouseId });
    
    res.status(200).json(capsules);
  } catch (error) {
    console.error('Error fetching capsules:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get a single capsule
exports.getCapsuleById = async (req, res) => {
  try {
    const { warehouseId, capsuleId } = req.params;
    
    const capsule = await Capsule.findOne({ _id: capsuleId, warehouseId });
    
    if (!capsule) {
      return res.status(404).json({ message: 'Capsule not found' });
    }
    
    res.status(200).json(capsule);
  } catch (error) {
    console.error(`Error fetching capsule ${req.params.capsuleId}:`, error);
    res.status(500).json({ message: 'Server error' });
  }
};