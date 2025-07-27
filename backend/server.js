// backend/server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables as early as possible
dotenv.config();

// --- Mock Database for Hackathon (Using temp_db.js) ---
// Import all mock data and mock models directly from temp_db.js
const {
    users, suppliers, reviews, bookings, warehouses, capsules, initMockData,
    User, Supplier, Review, Booking, Warehouse, Capsule, Product // Ensure all mock models are exported by temp_db.js
} = require('./temp_db');

// Initialize the mock data
initMockData();
// --- End Mock Database Setup ---


// --- Import Controllers and Inject Mock Models ---
// Each controller will now have a 'setMock...' method to receive its mock models.
const authController = require('./controllers/authController');
authController.setMockUser(User);

const supplierController = require('./controllers/supplierController');
supplierController.setMockSupplier(Supplier);
supplierController.setMockReview(Review); // Assuming supplierController also uses Review

const reviewController = require('./controllers/reviewController'); // Assuming you have this controller
reviewController.setMockReview(Review);
reviewController.setMockSupplier(Supplier);
reviewController.setMockUser(User);

const bookingController = require('./controllers/bookingController');
bookingController.setMockBooking(Booking);
bookingController.setMockCapsule(Capsule);
bookingController.setMockUser(User);

const warehouseController = require('./controllers/warehouseController');
warehouseController.setMockWarehouse(Warehouse);
warehouseController.setMockCapsule(Capsule); // If warehouseController uses Capsule
warehouseController.setMockReview(Review); // If warehouseController uses Review
const capsuleController = require('./controllers/capsuleController');
capsuleController.setMockCapsule(Capsule);
capsuleController.setMockWarehouse(Warehouse); // If capsuleController uses Warehouse

const productController = require('./controllers/productController');
productController.setMockProduct(Product);

// Add other controllers and their mock injections here if needed
// const productController = require('./controllers/productController');
// productController.setMockProduct(Product);


// --- Import API Routes (after controllers are set up) ---
// These routes will now use the controllers that have been injected with mock models.
const authRoutes = require('./routes/auth');
const supplierRoutes = require('./routes/supplier'); // Ensure this matches your route file name (singular or plural)
const reviewRoutes = require('./routes/reviews');
const bookingRoutes = require('./routes/bookingRoutes');
const warehouseRoutes = require('./routes/warehouseRoutes');
// Add other route imports here if they exist (e.g., const creditRoutes = require('./routes/creditRoutes');)


const app = express(); // Initialize Express app

// Middleware
app.use(cors()); // Allows cross-origin requests from your frontend
app.use(express.json()); // Parses incoming JSON requests

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/suppliers', supplierRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/warehouses', warehouseRoutes);
// Add other app.use for other routes here if present (e.g., app.use('/api/credit', creditRoutes);)


// Basic route for testing the API server
app.get('/', (req, res) => {
    res.send('Street Vendor Empowerment Platform API is running with Mock Data!');
});

// Error handling middleware (optional, but good practice)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke on the server!');
});

// Start the server
const PORT = process.env.PORT || 5000; // Get PORT from .env or default to 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// --- MongoDB Connection (Commented out for mock DB setup) ---
// If you were to use a real MongoDB, you would uncomment the following lines
// and ensure MongoDB is installed and running, and MONGODB_URI is correctly set in .env
// const mongoose = require('mongoose');
// mongoose.connect(process.env.MONGODB_URI)
//   .then(() => {
//     console.log('Connected to MongoDB');
//     const PORT = process.env.PORT || 5000;
//     app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
//   })
//   .catch(err => {
//     console.error('Failed to connect to MongoDB', err);
//     process.exit(1);
//   });