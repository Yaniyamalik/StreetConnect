// backend/routes/suppliers.js
const express = require('express');
const router = express.Router();
const supplierController = require('../controllers/supplierController'); // Assuming a supplierController exists or will be created
const protect = require('../middleware/authMiddleware'); // Assuming this is the correct import for your auth middleware

// Get all suppliers (with optional search/filter)
router.get('/', supplierController.getSuppliers);

// Get a single supplier by ID
router.get('/:id', supplierController.getSupplierById);

// Add a new supplier (protected route, typically for supplier role)
router.post('/', protect, supplierController.createSupplier);

// Update supplier (protected route)
router.put('/:id', protect, supplierController.updateSupplier);

// Delete supplier (protected route, typically for admin or supplier owner)
router.delete('/:id', protect, supplierController.deleteSupplier);

module.exports = router;