// backend/models/User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: { // Often users log in with email, not just username
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        match: [/.+@.+\..+/, 'Please fill a valid email address'] // Basic email validation
    },
    password: {
        type: String,
        required: true,
        minlength: 6 // In production, this would be hashed and never stored directly
    },
    role: {
        type: String,
        enum: ['vendor', 'supplier', 'admin'], // Expanded roles based on project scope
        default: 'vendor'
    },
    contactNumber: {
        type: String,
        trim: true,
        // You might add regex for Indian phone numbers if needed
    },
    address: {
        type: String,
        trim: true
    },
    // Add any other user-specific fields your team might need
    // e.g., profilePicture: String,
    //       isVerified: { type: Boolean, default: false },
}, {
    timestamps: true // Adds createdAt and updatedAt fields
});

module.exports = mongoose.model('User', UserSchema);