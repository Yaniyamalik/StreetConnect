// server/routes/warehouseRoutes.js
const express = require('express');
const router = express.Router();
const warehouseController = require('../controllers/warehouseController');
const protect = require('../middleware/authMiddleware');

// Get all warehouses
router.get('/', warehouseController.getWarehouses);

// Get single warehouse
router.get('/:id', warehouseController.getWarehouseById);

// Book a warehouse slot (protected route)
router.post('/:id/book', protect, warehouseController.bookWarehouseSlot);
// Get warehouse reviews
router.get('/:id/reviews', warehouseController.getWarehouseReviews);

module.exports = router;

