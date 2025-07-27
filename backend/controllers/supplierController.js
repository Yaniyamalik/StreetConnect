// backend/controllers/supplierController.js
//const Supplier = require('../models/Supplier'); // Import the mock Supplier model
//const Review = require('../models/Review'); // Import Review model to update ratings
let Supplier; // Declare Supplier variable
let Review;   // Declare Review variable (if it uses Review)

// Methods to inject mock models
exports.setMockSupplier = (mockSupplier) => { Supplier = mockSupplier; };
exports.setMockReview = (mockReview) => { Review = mockReview; };
// Get all suppliers (with filtering, sorting, pagination)
exports.getSuppliers = async (req, res) => {
    try {
        const { search, category, location, minRating, sortBy, page = 1, limit = 10 } = req.query;
        let query = {};
        const skip = (page - 1) * limit;
        let sort = {};

        if (search) {
            query.name = { $regex: search, $options: 'i' };
        }
        if (category) {
            query.category = category;
        }
        if (location) {
            query.address = { $regex: location, $options: 'i' };
        }
        if (minRating) {
            query.averageRating = { $gte: parseFloat(minRating) };
        }

        if (sortBy === 'rating') {
            sort.averageRating = -1; // Highest rating first
        } else {
            sort.createdAt = -1; // Default to newest first
        }

        const suppliers = await Supplier.find(query)
                                        .sort(sort)
                                        .skip(skip)
                                        .limit(limit);

        const total = await Supplier.countDocuments(query);

        res.status(200).json({
            suppliers,
            currentPage: parseInt(page),
            totalPages: Math.ceil(total / limit),
            totalSuppliers: total
        });
    } catch (error) {
        console.error('Error fetching suppliers:', error);
        res.status(500).json({ message: 'Server error fetching suppliers', error: error.message });
    }
};

// Get a single supplier by ID
exports.getSupplierById = async (req, res) => {
    try {
        const supplier = await Supplier.findById(req.params.id);
        if (!supplier) {
            return res.status(404).json({ message: 'Supplier not found' });
        }
        // Also fetch reviews for this supplier
        const reviews = await Review.find({ supplierId: supplier._id }); // Assuming Review model has supplierId
        // Mock populate vendor username for reviews
        const populatedReviews = Review.populate(reviews, 'vendorId', 'username');

        res.status(200).json({ supplier, reviews: populatedReviews });
    } catch (error) {
        console.error('Error fetching supplier details:', error);
        res.status(500).json({ message: 'Server error fetching supplier details', error: error.message });
    }
};

// Create a new supplier
exports.createSupplier = async (req, res) => {
    const { userId, name, category, address, contact, description } = req.body;
    try {
        // In a real app, userId would come from req.user.id after authentication
        const newSupplier = await Supplier.create({ userId, name, category, address, contact, description });
        console.log('Mock createSupplier hit:', newSupplier);
        res.status(201).json({ message: 'Supplier created successfully (mock)', supplier: newSupplier });
    } catch (error) {
        console.error('Mock createSupplier error:', error);
        res.status(500).json({ message: 'Mock supplier creation failed', error: error.message });
    }
};

// Update an existing supplier
exports.updateSupplier = async (req, res) => {
    const { id } = req.params;
    const updates = req.body; // Data to update
    try {
        const updatedSupplier = await Supplier.findByIdAndUpdate(id, updates, { new: true });
        if (!updatedSupplier) {
            return res.status(404).json({ message: 'Supplier not found' });
        }
        console.log('Mock updateSupplier hit:', updatedSupplier);
        res.status(200).json({ message: 'Supplier updated successfully (mock)', supplier: updatedSupplier });
    } catch (error) {
        console.error('Mock updateSupplier error:', error);
        res.status(500).json({ message: 'Mock supplier update failed', error: error.message });
    }
};

// Delete a supplier
exports.deleteSupplier = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedSupplier = await Supplier.findByIdAndDelete(id); // Using findByIdAndDelete for mock
        if (!deletedSupplier) {
            return res.status(404).json({ message: 'Supplier not found' });
        }
        console.log('Mock deleteSupplier hit:', deletedSupplier);
        res.status(200).json({ message: 'Supplier deleted successfully (mock)' });
    } catch (error) {
        console.error('Mock deleteSupplier error:', error);
        res.status(500).json({ message: 'Mock supplier deletion failed', error: error.message });
    }
};