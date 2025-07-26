const express = require('express');
const router = express.Router({ mergeParams: true });
const capsuleController = require('../controllers/capsuleController');

// Get all capsules for a warehouse
router.get('/', capsuleController.getCapsules);

// Get a single capsule
router.get('/:capsuleId', capsuleController.getCapsuleById);

module.exports = router;

// server/routes/warehouseRoutes.js
const express = require('express');
const router = express.Router();
const warehouseController = require('../controllers/warehouseController');
const capsuleRoutes = require('./capsuleRoutes');

// Nested routes for capsules
router.use('/:warehouseId/capsules', capsuleRoutes);

// Get all warehouses
router.get('/', warehouseController.getWarehouses);

// Get a single warehouse
router.get('/:id', warehouseController.getWarehouseById);

module.exports = router;