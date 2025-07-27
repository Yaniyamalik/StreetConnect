<<<<<<< HEAD:backend/src/models/User.js

import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from 'dotenv';
import crypto from "crypto"

dotenv.config({
    path: "./.env"  
});

const userschema = new Schema({
    fullname: {
    type: String,
    required: true,
  },
   username: {
    type: String,
    required: true,
    unique:true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  shopName: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
    refreshToken: {
        type: String
    }

}, { timestamps: true });


userschema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
  
    try {
     
      this.password = await bcrypt.hash(this.password, 10);
      next();
    } catch (err) {
      next(err);
    }
  });

userschema.methods.isPasswordCorrect = async function(password) {
    return await bcrypt.compare(password, this.password);
};


userschema.methods.generateAccessToken = function() {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullname: this.fullname
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY // Use your desired expiry time
        }
    );
};


userschema.methods.generateRefreshToken = function() {
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY // Use your desired expiry time
        }
    );
};
function generateAvatar(email) {
    const hash = crypto.createHash("md5").update(email.trim().toLowerCase()).digest("hex");
    return `https://www.gravatar.com/avatar/${hash}?d=identicon`;
  }

export const User = mongoose.model("User", userschema);
=======
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
>>>>>>> 626b1573a4c63390e1e3b4e3d571fa19c06ec4d4:backend/models/User.js
