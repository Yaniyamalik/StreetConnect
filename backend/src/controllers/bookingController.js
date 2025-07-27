<<<<<<< HEAD:backend/src/controllers/bookingController.js
import { Booking } from '../models/Booking.js';
import { Capsule } from '../models/Capsule.js';
import { User } from '../models/User.js';
=======
//const Booking = require('../models/Booking');
//const Capsule = require('../models/Capsule');
//const User = require('../models/User');
let Booking;
let Capsule;
let User;
>>>>>>> 626b1573a4c63390e1e3b4e3d571fa19c06ec4d4:backend/controllers/bookingController.js

exports.setMockBooking = (mockBooking) => { Booking = mockBooking; };
exports.setMockCapsule = (mockCapsule) => { Capsule = mockCapsule; };
exports.setMockUser = (mockUser) => { User = mockUser; };
// Create a new booking
const createBooking = async (req, res) => {
  try {
    const {
      warehouseId,
      capsuleId,
      startDate,
      endDate,
      options,
      accessSchedule,
      notes,
      totalPrice
    } = req.body;

    const userId = req.user.id;

    const capsule = await Capsule.findById(capsuleId);
    if (!capsule) {
      return res.status(404).json({ message: 'Capsule not found' });
    }

    if (capsule.status !== 'available') {
      return res.status(400).json({ message: 'This capsule is not available for booking' });
    }

    const overlappingBooking = await Booking.findOne({
      capsuleId,
      status: { $in: ['pending', 'confirmed'] },
      $or: [
        { startDate: { $lte: endDate }, endDate: { $gte: startDate } }
      ]
    });

    if (overlappingBooking) {
      return res.status(400).json({ message: 'This capsule is already booked for the selected dates' });
    }

    const booking = new Booking({
      userId,
      warehouseId,
      capsuleId,
      startDate,
      endDate,
      options,
      accessSchedule,
      notes,
      totalPrice,
      status: 'pending',
      paymentStatus: 'pending'
    });

    await booking.save();

    capsule.status = 'booked';
    await capsule.save();

    res.status(201).json({ message: 'Booking created successfully', booking });
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get bookings by user
const getBookingsByUser = async (req, res) => {
  try {
    const userId = req.user.id;

    const bookings = await Booking.find({ userId })
      .populate('warehouseId', 'name address')
      .populate('capsuleId', 'name section isColdStorage size')
      .sort({ createdAt: -1 });

    res.status(200).json(bookings);
  } catch (error) {
    console.error('Error fetching user bookings:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Cancel booking
const cancelBooking = async (req, res) => {
  try {
    const bookingId = req.params.id;
    const userId = req.user.id;

    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    if (booking.userId.toString() !== userId) {
      return res.status(403).json({ message: 'Not authorized to cancel this booking' });
    }

    if (booking.status === 'cancelled' || booking.status === 'completed') {
      return res.status(400).json({ message: `Booking is already ${booking.status}` });
    }

    const now = new Date();
    const startDate = new Date(booking.startDate);
    const hoursUntilStart = (startDate - now) / (1000 * 60 * 60);

    let refundAmount = booking.totalPrice;

    if (hoursUntilStart < 48) {
      const totalDays = (new Date(booking.endDate) - new Date(booking.startDate)) / (1000 * 60 * 60 * 24);
      const oneDayCharge = booking.totalPrice / totalDays;
      refundAmount = booking.totalPrice - oneDayCharge;
    }

    booking.status = 'cancelled';
    booking.paymentStatus = 'refunded';
    await booking.save();

    await Capsule.findByIdAndUpdate(booking.capsuleId, { status: 'available' });

    res.status(200).json({
      message: 'Booking cancelled successfully',
      refundAmount: Math.max(0, refundAmount)
    });
  } catch (error) {
    console.error('Error cancelling booking:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export default {
  createBooking,
  getBookingsByUser,
  cancelBooking
};
