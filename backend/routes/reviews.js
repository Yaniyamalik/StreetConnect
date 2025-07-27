// backend/routes/reviews.js
const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController'); // Assuming reviewController exists and is correctly set up
const protect = require('../middleware/authMiddleware'); // Assuming this is the correct import for your auth middleware

// Create a new review (protected route)
router.post('/', protect, reviewController.createReview);

// Get reviews for a specific supplier (or product, warehouse, etc.)
// This route assumes you'll pass the ID of the item being reviewed (e.g., supplierId)
router.get('/:supplierId', reviewController.getReviewsBySupplier);

// You might add other review-related routes like update, delete, get by user etc.
// router.put('/:id', protect, reviewController.updateReview);
// router.delete('/:id', protect, reviewController.deleteReview);

module.exports = router;