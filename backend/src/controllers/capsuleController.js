import { Capsule } from '../models/Capsule.js';

// Get all capsules for a specific warehouse
const getCapsules = async (req, res) => {
  try {
    const warehouseId = req.params.warehouseId;

    if (!warehouseId) {
      return res.status(400).json({ message: 'Warehouse ID is required' });
    }

    const capsules = await Capsule.find({ warehouseId });
    res.status(200).json(capsules);
  } catch (error) {
    console.error('Error fetching capsules:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get a single capsule by ID
const getCapsuleById = async (req, res) => {
  try {
    const capsuleId = req.params.capsuleId;

    const capsule = await Capsule.findById(capsuleId);
    if (!capsule) {
      return res.status(404).json({ message: 'Capsule not found' });
    }

    res.status(200).json(capsule);
  } catch (error) {
    console.error('Error fetching capsule:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export default {
  getCapsules,
  getCapsuleById
};
