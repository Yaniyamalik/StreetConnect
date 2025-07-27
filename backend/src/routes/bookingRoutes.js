import express from 'express';
import { verifyJWT as protect } from '../middleware/auth.middleware.js';
import bookingController from '../controllers/bookingController.js';

const bookingrouter = express.Router();

// Create a new booking
bookingrouter.post('/createbooking', protect, bookingController.createBooking);

// Get bookings by user
bookingrouter.get('/user/:userId', protect, bookingController.getBookingsByUser);

// Cancel booking
bookingrouter.post('/:id/cancel', protect, bookingController.cancelBooking);

export default bookingrouter;


