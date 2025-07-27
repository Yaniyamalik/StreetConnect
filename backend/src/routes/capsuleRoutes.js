import express from 'express';
import capsuleController from '../controllers/capsuleController.js';

const capsulerouter = express.Router({ mergeParams: true });

// Get all capsules for a warehouse
capsulerouter.get('/', capsuleController.getCapsules);

// Get a single capsule
capsulerouter.get('/:capsuleId', capsuleController.getCapsuleById);

export default capsulerouter;

