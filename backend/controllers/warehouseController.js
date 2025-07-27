
const Warehouse = require('./Warehouse');

// Get all warehouses with filtering, pagination
exports.getWarehouses = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    
    // Build filter object
    const filter = {};
    
    // Filter by features
    const features = [];
    if (req.query.has24HourAccess === 'true') features.push('24/7 Access');
    if (req.query.hasCapsuleStorage === 'true') features.push('Capsule Storage');
    if (req.query.hasClimateControl === 'true') features.push('Climate Control');
    if (req.query.hasSecurity === 'true') features.push('Security');
    
    if (features.length > 0) {
      filter.features = { $all: features };
    }
    
    // Filter by location
    if (req.query.location) {
      const locationMap = {
        'north': 'North District',
        'south': 'South District',
        'east': 'East District',
        'west': 'West District',
        'central': 'Central District'
      };
      filter.location = locationMap[req.query.location] || req.query.location;
    }
    
    // Filter by price range
    if (req.query.minPrice || req.query.maxPrice) {
      filter.pricePerMonth = {};
      if (req.query.minPrice) filter.pricePerMonth.$gte = parseFloat(req.query.minPrice);
      if (req.query.maxPrice) filter.pricePerMonth.$lte = parseFloat(req.query.maxPrice);
    }
    
    // Filter by availability
    if (req.query.availability) {
      filter.availability = req.query.availability;
    }
    
    // Handle search
    if (req.query.search) {
      filter.$text = { $search: req.query.search };
    }
    
    // Execute query with pagination
    const warehouses = await Warehouse.find(filter)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });
    
    // Get total count for pagination
    const total = await Warehouse.countDocuments(filter);
    
    res.status(200).json({
      warehouses,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalWarehouses: total
    });
  } catch (error) {
    console.error('Error fetching warehouses:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get single warehouse by ID
exports.getWarehouseById = async (req, res) => {
  try {
    const warehouse = await Warehouse.findById(req.params.id);
    
    if (!warehouse) {
      return res.status(404).json({ message: 'Warehouse not found' });
    }
    
    res.status(200).json(warehouse);
  } catch (error) {
    console.error(`Error fetching warehouse ${req.params.id}:`, error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Book a slot in a warehouse
exports.bookWarehouseSlot = async (req, res) => {
  try {
    const warehouse = await Warehouse.findById(req.params.id);
    
    if (!warehouse) {
      return res.status(404).json({ message: 'Warehouse not found' });
    }
    
    if (warehouse.availableSlots <= 0) {
      return res.status(400).json({ message: 'No slots available in this warehouse' });
    }
    
    // Update available slots
    warehouse.availableSlots -= 1;
    
    // Update availability status if needed
    if (warehouse.availableSlots === 0) {
      warehouse.availability = 'waitlist';
    } else if (warehouse.availableSlots <= warehouse.totalSlots * 0.2) {
      warehouse.availability = 'limited';
    }
    
    await warehouse.save();
    
    // In a real app, you would create a booking record here
    
    res.status(200).json({
      message: 'Slot booked successfully',
      booking: {
        warehouseId: warehouse._id,
        warehouseName: warehouse.name,
        bookingDate: new Date(),
        // Other booking details
      }
    });
  } catch (error) {
    console.error(`Error booking slot in warehouse ${req.params.id}:`, error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get warehouse reviews
exports.getWarehouseReviews = async (req, res) => {
  try {
    // In a real app, you would fetch reviews from a Review model
    // For now, we'll return mock data
    const reviews = [
      {
        id: '1',
        warehouseId: req.params.id,
        userId: 'user1',
        userName: 'John Doe',
        rating: 4,
        comment: 'Great warehouse with excellent security features.',
        createdAt: new Date('2023-01-15')
      },
      {
        id: '2',
        warehouseId: req.params.id,
        userId: 'user2',
        userName: 'Jane Smith',
        rating: 5,
        comment: 'The climate control is perfect for my inventory. Highly recommended!',
        createdAt: new Date('2023-02-20')
      }
    ];
    
    res.status(200).json(reviews);
  } catch (error) {
    console.error(`Error fetching reviews for warehouse ${req.params.id}:`, error);
    res.status(500).json({ message: 'Server error' });
  }
};