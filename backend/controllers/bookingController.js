const Booking = require('../models/Booking');
const Capsule = require('../models/Capsule');
const User = require('../models/User');

// Create a new booking
exports.createBooking = async (req, res) => {
  try {
    const { warehouseId, capsuleId, startDate, endDate, options, accessSchedule, notes, totalPrice } = req.body;
    const userId = req.user.id; // From auth middleware
    
    // Check if capsule is available
    const capsule = await Capsule.findById(capsuleId);
    if (!capsule) {
      return res.status(404).json({ message: 'Capsule not found' });
    }
    
    if (capsule.status !== 'available') {
      return res.status(400).json({ message: 'This capsule is not available for booking' });
    }
    
    // Check for overlapping bookings
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
    
    // Create booking
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
    
    // Update capsule status
    capsule.status = 'booked';
    await capsule.save();
    
    res.status(201).json({
      message: 'Booking created successfully',
      booking
    });
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get bookings by user
exports.getBookingsByUser = async (req, res) => {
  try {
    const userId = req.user.id; // From auth middleware
    
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
exports.cancelBooking = async (req, res) => {
  try {
    const bookingId = req.params.id;
    const userId = req.user.id; // From auth middleware
    
    const booking = await Booking.findById(bookingId);
    
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    
    // Check if booking belongs to user
    if (booking.userId.toString() !== userId) {
      return res.status(403).json({ message: 'Not authorized to cancel this booking' });
    }
    
    // Check if booking can be cancelled (not already cancelled or completed)
    if (booking.status === 'cancelled' || booking.status === 'completed') {
      return res.status(400).json({ message: `Booking is already ${booking.status}` });
    }
    
    // Check cancellation policy (48 hours before start date)
    const now = new Date();
    const startDate = new Date(booking.startDate);
    const hoursUntilStart = (startDate - now) / (1000 * 60 * 60);
    
    let refundAmount = booking.totalPrice;
    
    if (hoursUntilStart < 48) {
      // Apply cancellation fee (one day charge)
      const oneDayCharge = booking.totalPrice / ((new Date(booking.endDate) - new Date(booking.startDate)) / (1000 * 60 * 60 * 24));
      refundAmount = booking.totalPrice - oneDayCharge;
    }
    
    // Update booking status
    booking.status = 'cancelled';
    booking.paymentStatus = 'refunded';
    await booking.save();
    
    // Update capsule status
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
