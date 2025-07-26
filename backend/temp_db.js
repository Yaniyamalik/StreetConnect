// backend/temp_db.js (Mock Database for Hackathon)
// This file provides in-memory data and mock Mongoose-like functions
// to allow the backend to run without a real MongoDB instance.

let users = [];
let suppliers = [];
let reviews = [];
let bookings = []; // Added for booking functionality
let warehouses = []; // Added for warehouse functionality
let capsules = []; // Added for capsule storage functionality

let nextUserId = 1;
let nextSupplierId = 1;
let nextReviewId = 1;
let nextBookingId = 1;
let nextWarehouseId = 1;
let nextCapsuleId = 1;

// --- Data Initialization Function ---
const initMockData = () => {
    console.log('Initializing mock database with sample data...');

    // Clear existing data (for nodemon restarts)
    users = [];
    suppliers = [];
    reviews = [];
    bookings = [];
    warehouses = [];
    capsules = [];

    // Sample Users
    const vendor1 = { _id: `user${nextUserId++}`, username: 'vendor1', email: 'vendor1@example.com', password: 'password', role: 'vendor', location: 'Delhi', contactNumber: '9876543210', createdAt: new Date() };
    const supplier1 = { _id: `user${nextUserId++}`, username: 'supplier1', email: 'supplier1@example.com', password: 'password', role: 'supplier', contactNumber: '9988776655', createdAt: new Date() };
    const supplier2 = { _id: `user${nextUserId++}`, username: 'supplier2', email: 'supplier2@example.com', password: 'password', role: 'supplier', contactNumber: '9977665544', createdAt: new Date() };
    users.push(vendor1, supplier1, supplier2);

    // Sample Suppliers
    const s1 = {
        _id: `supplier${nextSupplierId++}`,
        userId: supplier1._id,
        name: 'Fresh Veggies Co.',
        category: ['Vegetables', 'Fruits'],
        address: '123 Mandi Road, Delhi',
        contact: '9876543211',
        description: 'Wholesale fresh vegetables and fruits.',
        averageRating: 4.5,
        reviewCount: 2,
        createdAt: new Date()
    };
    const s2 = {
        _id: `supplier${nextSupplierId++}`,
        userId: supplier2._id,
        name: 'Spice Bazaar',
        category: ['Spices', 'Dry Goods'],
        address: '456 Spice Lane, Delhi',
        contact: '9876543212',
        description: 'Premium quality spices and dry groceries.',
        averageRating: 4.0,
        reviewCount: 1,
        createdAt: new Date()
    };
    suppliers.push(s1, s2);

    // Sample Reviews
    reviews.push({
        _id: `review${nextReviewId++}`,
        supplierId: s1._id,
        vendorId: vendor1._id,
        rating: 5,
        comment: 'Excellent quality vegetables and fair prices!',
        createdAt: new Date('2024-07-20T10:00:00Z')
    });
    reviews.push({
        _id: `review${nextReviewId++}`,
        supplierId: s1._id,
        vendorId: vendor1._id,
        rating: 4,
        comment: 'Good service, sometimes stock runs low.',
        createdAt: new Date('2024-07-21T11:00:00Z')
    });
    reviews.push({
        _id: `review${nextReviewId++}`,
        supplierId: s2._id,
        vendorId: vendor1._id,
        rating: 4,
        comment: 'Reliable source for spices, good variety.',
        createdAt: new Date('2024-07-22T12:00:00Z')
    });

    // Sample Warehouses
    const w1 = {
        _id: `warehouse${nextWarehouseId++}`,
        userId: supplier1._id, // Owner of the warehouse
        name: 'Central Storage Hub',
        address: '789 Warehouse St, Central District, Delhi',
        location: { latitude: 28.6139, longitude: 77.2090 }, // Delhi coordinates
        capacity: 1000, // sq. ft.
        availableSpace: 950,
        pricePerUnit: 10, // Rs. per sq. ft.
        priceUnit: 'sqft',
        description: 'Large, secure warehouse with 24/7 access.',
        images: [],
        amenities: ['24/7 Access', 'Security'],
        isAvailable: true,
        averageRating: 4.8,
        reviewCount: 3,
        coordinates: { lat: 28.6139, lng: 77.2090 },
        totalSlots: 10, // Example for slot-based booking
        availableSlots: 8,
        createdAt: new Date()
    };
    warehouses.push(w1);

    // Sample Capsules (within a warehouse)
    const c1 = {
        _id: `capsule${nextCapsuleId++}`,
        warehouseId: w1._id,
        name: 'Unit A-1',
        section: 'Ground Floor',
        isColdStorage: false,
        size: 50,
        sizeUnit: 'sqft',
        pricePerPeriod: 500, // Rs. per month
        pricePeriodUnit: 'month',
        status: 'available',
        description: 'Standard dry storage capsule.',
        createdAt: new Date()
    };
    const c2 = {
        _id: `capsule${nextCapsuleId++}`,
        warehouseId: w1._id,
        name: 'Cold Unit B-2',
        section: 'Basement',
        isColdStorage: true,
        size: 30,
        sizeUnit: 'cubicft',
        pricePerPeriod: 800,
        pricePeriodUnit: 'month',
        status: 'available',
        description: 'Climate-controlled cold storage.',
        createdAt: new Date()
    };
    capsules.push(c1, c2);

    // Sample Bookings (optional, for testing booking logic)
    bookings.push({
        _id: `booking${nextBookingId++}`,
        userId: vendor1._id,
        warehouseId: w1._id,
        capsuleId: c1._id,
        startDate: new Date('2024-08-01T00:00:00Z'),
        endDate: new Date('2024-08-31T23:59:59Z'),
        options: ['standard'],
        totalPrice: 500,
        status: 'confirmed',
        paymentStatus: 'paid',
        createdAt: new Date('2024-07-25T10:00:00Z')
    });

    console.log('Mock data initialized. Users:', users.length, 'Suppliers:', suppliers.length, 'Warehouses:', warehouses.length, 'Capsules:', capsules.length, 'Bookings:', bookings.length);
};

// --- Mock Mongoose-like Functions ---
// These functions mimic basic Mongoose operations on the in-memory arrays.

// Generic find function
const genericFind = (collection, query) => {
    return collection.filter(item => {
        for (const key in query) {
            if (key.startsWith('$')) { // Handle special Mongoose operators like $regex, $in, $text
                if (key === '$text' && query.$text.$search) {
                    const searchTerm = query.$text.$search.toLowerCase();
                    if (!(item.name && item.name.toLowerCase().includes(searchTerm)) &&
                        !(item.description && item.description.toLowerCase().includes(searchTerm)) &&
                        !(item.address && item.address.toLowerCase().includes(searchTerm))) {
                        return false;
                    }
                } else if (key === '$or') {
                    const orConditions = query.$or;
                    if (!orConditions.some(cond => genericFind([item], cond).length > 0)) {
                        return false;
                    }
                } else if (key === '$in') {
                    // For fields like status: { $in: ['pending', 'confirmed'] }
                    const field = Object.keys(query[key])[0]; // Get the field name
                    const values = query[key][field]; // Get the array of values
                    if (!values.includes(item[field])) {
                        return false;
                    }
                } else if (key === '$all') {
                    // For features: { $all: ['24/7 Access', 'Security'] }
                    const field = Object.keys(query[key])[0];
                    const requiredFeatures = query[key][field];
                    if (item[field] && !requiredFeatures.every(f => item[field].includes(f))) {
                        return false;
                    }
                } else if (key === '$gte' || key === '$lte') {
                    // For pricePerMonth: { $gte: 100, $lte: 500 }
                    const field = Object.keys(query[key])[0]; // e.g., 'pricePerMonth'
                    if (key === '$gte' && item[field] < query[key][field]) return false;
                    if (key === '$lte' && item[field] > query[key][field]) return false;
                }
                // Add more operator handling as needed
            } else if (item[key] === undefined || (typeof query[key] === 'object' && !Array.isArray(query[key]))) {
                // Handle nested queries for price range, etc.
                if (typeof query[key] === 'object' && !Array.isArray(query[key])) {
                    if (!genericFind([item[key]], query[key]).length) return false;
                } else if (item[key] !== query[key]) {
                    return false;
                }
            } else if (typeof query[key] === 'string' && query[key].startsWith('$regex')) {
                const regex = new RegExp(query[key].substring(7, query[key].length - 1), 'i'); // Simple regex parsing
                if (!regex.test(item[key])) return false;
            } else if (Array.isArray(item[key]) && typeof query[key] === 'string') {
                if (!item[key].includes(query[key])) return false;
            } else if (item[key] !== query[key]) {
                return false;
            }
        }
        return true;
    });
};

// Mock Mongoose Model for User
const User = {
    find: (query = {}) => genericFind(users, query),
    findOne: (query = {}) => genericFind(users, query)[0],
    findById: (id) => users.find(u => u._id === id),
    create: (data) => {
        const newUser = { _id: `user${nextUserId++}`, createdAt: new Date(), ...data };
        users.push(newUser);
        return newUser;
    },
    findByIdAndUpdate: (id, updates) => {
        const index = users.findIndex(u => u._id === id);
        if (index !== -1) {
            users[index] = { ...users[index], ...updates, updatedAt: new Date() };
            return users[index];
        }
        return null;
    }
};

// Mock Mongoose Model for Supplier
const Supplier = {
    find: (query = {}) => genericFind(suppliers, query).sort((a,b) => b.averageRating - a.averageRating),
    findOne: (query = {}) => genericFind(suppliers, query)[0],
    findById: (id) => suppliers.find(s => s._id === id),
    create: (data) => {
        const newSupplier = { _id: `supplier${nextSupplierId++}`, createdAt: new Date(), averageRating: 0, reviewCount: 0, ...data };
        suppliers.push(newSupplier);
        return newSupplier;
    },
    findByIdAndUpdate: (id, updates) => {
        const index = suppliers.findIndex(s => s._id === id);
        if (index !== -1) {
            suppliers[index] = { ...suppliers[index], ...updates, updatedAt: new Date() };
            return suppliers[index];
        }
        return null;
    },
    // Mock populate for reviews in supplier details
    populate: (items, path, select) => {
        if (path === 'vendorId' && items[0] && items[0].vendorId) {
            return items.map(item => ({
                ...item,
                vendorId: users.find(u => u._id === item.vendorId) // Simple mock populate
            }));
        }
        return items;
    }
};

// Mock Mongoose Model for Review
const Review = {
    find: (query = {}) => genericFind(reviews, query).sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt)),
    findOne: (query = {}) => genericFind(reviews, query)[0],
    findById: (id) => reviews.find(r => r._id === id),
    create: (data) => {
        const newReview = { _id: `review${nextReviewId++}`, createdAt: new Date(), ...data };
        reviews.push(newReview);
        return newReview;
    },
    findByIdAndUpdate: (id, updates) => {
        const index = reviews.findIndex(r => r._id === id);
        if (index !== -1) {
            reviews[index] = { ...reviews[index], ...updates, updatedAt: new Date() };
            return reviews[index];
        }
        return null;
    },
    populate: (items, path, select) => {
         if (path === 'vendorId' && items[0] && items[0].vendorId) {
            return items.map(item => ({
                ...item,
                vendorId: users.find(u => u._id === item.vendorId) // Simple mock populate
            }));
        }
        return items;
    }
};

// Mock Mongoose Model for Warehouse
const Warehouse = {
    find: (query = {}) => genericFind(warehouses, query).sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt)),
    findOne: (query = {}) => genericFind(warehouses, query)[0],
    findById: (id) => warehouses.find(w => w._id === id),
    create: (data) => {
        const newWarehouse = { _id: `warehouse${nextWarehouseId++}`, createdAt: new Date(), averageRating: 0, reviewCount: 0, ...data };
        warehouses.push(newWarehouse);
        return newWarehouse;
    },
    findByIdAndUpdate: (id, updates) => {
        const index = warehouses.findIndex(w => w._id === id);
        if (index !== -1) {
            warehouses[index] = { ...warehouses[index], ...updates, updatedAt: new Date() };
            return warehouses[index];
        }
        return null;
    },
    countDocuments: (query = {}) => genericFind(warehouses, query).length
};

// Mock Mongoose Model for Capsule
const Capsule = {
    find: (query = {}) => genericFind(capsules, query),
    findOne: (query = {}) => genericFind(capsules, query)[0],
    findById: (id) => capsules.find(c => c._id === id),
    create: (data) => {
        const newCapsule = { _id: `capsule${nextCapsuleId++}`, createdAt: new Date(), ...data };
        capsules.push(newCapsule);
        return newCapsule;
    },
    findByIdAndUpdate: (id, updates) => {
        const index = capsules.findIndex(c => c._id === id);
        if (index !== -1) {
            capsules[index] = { ...capsules[index], ...updates, updatedAt: new Date() };
            return capsules[index];
        }
        return null;
    }
};

// Mock Mongoose Model for Booking
const Booking = {
    find: (query = {}) => genericFind(bookings, query).sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt)),
    findOne: (query = {}) => genericFind(bookings, query)[0],
    findById: (id) => bookings.find(b => b._id === id),
    create: (data) => {
        const newBooking = { _id: `booking${nextBookingId++}`, createdAt: new Date(), ...data };
        bookings.push(newBooking);
        return newBooking;
    },
    findByIdAndUpdate: (id, updates) => {
        const index = bookings.findIndex(b => b._id === id);
        if (index !== -1) {
            bookings[index] = { ...bookings[index], ...updates, updatedAt: new Date() };
            return bookings[index];
        }
        return null;
    },
    populate: (items, path, select) => {
        // Simple mock for populate, only for warehouseId and capsuleId for now
        if (path === 'warehouseId' && items[0] && items[0].warehouseId) {
            return items.map(item => ({
                ...item,
                warehouseId: warehouses.find(w => w._id === item.warehouseId) // Mock populate
            }));
        }
        if (path === 'capsuleId' && items[0] && items[0].capsuleId) {
            return items.map(item => ({
                ...item,
                capsuleId: capsules.find(c => c._id === item.capsuleId) // Mock populate
            }));
        }
        return items;
    }
};

// Mock Mongoose Model for Product (if your teammate has a product model)
const Product = {
    find: (query = {}) => genericFind(products, query), // Assuming 'products' array exists
    findOne: (query = {}) => genericFind(products, query)[0],
    findById: (id) => products.find(p => p._id === id),
    create: (data) => {
        // Assuming nextProductId exists
        const newProduct = { _id: `product${nextProductId++}`, createdAt: new Date(), ...data };
        products.push(newProduct);
        return newProduct;
    }
};


module.exports = {
    users, suppliers, reviews, bookings, warehouses, capsules,
    initMockData,
    User, Supplier, Review, Booking, Warehouse, Capsule, Product // Export all mock models
};