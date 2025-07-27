// backend/controllers/reviewController.js
// Mock models will be injected by server.js
let Review;
let Supplier;
let User; // Assuming reviews might link to users

// Methods to inject mock models
exports.setMockReview = (mockReview) => { Review = mockReview; };
exports.setMockSupplier = (mockSupplier) => { Supplier = mockSupplier; };
exports.setMockUser = (mockUser) => { User = mockUser; };

// Create a new review
exports.createReview = async (req, res) => {
    const { supplierId, userId, rating, comment } = req.body;
    try {
        // In a real app, userId would come from req.user.id
        const newReview = await Review.create({ supplierId, vendorId: userId, rating, comment }); // Use vendorId to match Review model
        console.log('Mock createReview hit:', newReview);

        // Update supplier's average rating and review count (mock logic)
        const supplier = await Supplier.findById(supplierId);
        if (supplier) {
            const currentReviews = await Review.find({ supplierId }); // Get all reviews for this supplier
            const totalRating = currentReviews.reduce((sum, r) => sum + r.rating, 0);
            supplier.reviewCount = currentReviews.length;
            supplier.averageRating = totalRating / supplier.reviewCount;
            await Supplier.findByIdAndUpdate(supplierId, { averageRating: supplier.averageRating, reviewCount: supplier.reviewCount });
        }

        res.status(201).json({ message: 'Review created successfully (mock)', review: newReview });
    } catch (error) {
        console.error('Mock createReview error:', error);
        res.status(500).json({ message: 'Mock review creation failed', error: error.message });
    }
};

// Get reviews for a specific supplier
exports.getReviewsBySupplier = async (req, res) => {
    try {
        const supplierId = req.params.supplierId;
        const reviews = await Review.find({ supplierId }); // Use injected mock Review
        // Mock populate vendor username for display
        const populatedReviews = reviews.map(review => ({
            ...review,
            vendorId: User.findById(review.vendorId) // Mock populate user data
        }));

        console.log(`Mock getReviewsBySupplier hit for supplierId: ${supplierId}`);
        res.status(200).json(populatedReviews);
    } catch (error) {
        console.error('Mock getReviewsBySupplier error:', error);
        res.status(500).json({ message: 'Mock error fetching reviews', error: error.message });
    }
};

// Add other review-related functions as needed (update, delete)