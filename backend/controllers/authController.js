// backend/controllers/authController.js
//const User = require('../models/User'); // Import the mock User model
let User; // Declare User variable

// Method to inject mock model
exports.setMockUser = (mockUser) => { User = mockUser; };
// Placeholder for user registration logic
exports.registerUser = async (req, res) => {
    const { username, email, password, role, contactNumber, address } = req.body;
    try {
        // In a real app, you'd hash the password (e.g., using bcrypt)
        // and save the user to the database.
        // For mock:
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }
        const newUser = await User.create({ username, email, password, role, contactNumber, address });
        console.log('Mock registerUser hit:', newUser);
        res.status(201).json({ message: 'User registered successfully (mock)', user: newUser });
    } catch (error) {
        console.error('Mock registerUser error:', error);
        res.status(500).json({ message: 'Mock registration failed', error: error.message });
    }
};

// Placeholder for user login logic
exports.loginUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        // In a real app, you'd compare hashed passwords.
        // For mock:
        const user = await User.findOne({ username });
        if (!user || user.password !== password) { // Simple password check for mock
            return res.status(400).json({ message: 'Invalid credentials (mock)' });
        }
        console.log('Mock loginUser hit:', user);
        // In a real app, you'd generate and send a JWT token here.
        res.status(200).json({ message: 'Login successful (mock)', user: { id: user._id, username: user.username, role: user.role } });
    } catch (error) {
        console.error('Mock loginUser error:', error);
        res.status(500).json({ message: 'Mock login failed', error: error.message });
    }
};

// Add other auth-related controller functions here if needed by your routes
// exports.getUserProfile = async (req, res) => { ... };