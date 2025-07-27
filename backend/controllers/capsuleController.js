// backend/controllers/capsuleController.js
// const Capsule = require('../models/Capsule');     // COMMENT OUT THIS LINE
// const Warehouse = require('../models/Warehouse'); // COMMENT OUT THIS LINE

let Capsule;
let Warehouse;

exports.setMockCapsule = (mockCapsule) => { Capsule = mockCapsule; };
exports.setMockWarehouse = (mockWarehouse) => { Warehouse = mockWarehouse; };

// Get all capsules for a specific warehouse
exports.getCapsulesByWarehouse = async (req, res) => {
    try {
        const warehouseId = req.params.warehouseId;
        const capsules = await Capsule.find({ warehouseId }); // Use injected mock Capsule
        console.log(`Mock getCapsulesByWarehouse hit for warehouseId: ${warehouseId}`);
        res.status(200).json(capsules);
    } catch (error) {
        console.error('Mock getCapsulesByWarehouse error:', error);
        res.status(500).json({ message: 'Mock error fetching capsules', error: error.message });
    }
};

// Get a single capsule by ID
exports.getCapsuleById = async (req, res) => {
    try {
        const capsule = await Capsule.findById(req.params.id); // Use injected mock Capsule
        if (!capsule) {
            return res.status(404).json({ message: 'Capsule not found (mock)' });
        }
        console.log(`Mock getCapsuleById hit for ID: ${req.params.id}`);
        res.status(200).json(capsule);
    } catch (error) {
        console.error('Mock getCapsuleById error:', error);
        res.status(500).json({ message: 'Mock error fetching capsule by ID', error: error.message });
    }
};

// Placeholder for creating a new capsule (e.g., by a warehouse owner)
exports.createCapsule = async (req, res) => {
    try {
        const newCapsule = await Capsule.create(req.body); // Use injected mock Capsule
        console.log('Mock createCapsule hit:', newCapsule);
        res.status(201).json({ message: 'Capsule created successfully (mock)', capsule: newCapsule });
    } catch (error) {
        console.error('Mock createCapsule error:', error);
        res.status(500).json({ message: 'Mock error creating capsule', error: error.message });
    }
};

// Add other capsule-related functions as needed (update, delete)