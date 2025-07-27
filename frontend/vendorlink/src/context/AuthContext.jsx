// client/src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api'; // Ensure this path is correct: client/src/services/api.js

// Export AuthContext directly
export const AuthContext = createContext(null); // <--- EXPORTING CONTEXT DIRECTLY

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        try {
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                setUser(JSON.parse(storedUser));
            }
        } catch (error) {
            console.error("Failed to parse user from localStorage:", error);
            localStorage.removeItem('user');
        } finally {
            setLoading(false);
        }
    }, []);

    const login = async (username, password) => {
        try {
            const data = await api.login({ username, password });
            if (data.message === 'Logged in successfully!') {
                setUser(data.user);
                localStorage.setItem('user', JSON.stringify(data.user));
                return { success: true, user: data.user };
            } else {
                return { success: false, message: data.message || 'Login failed.' };
            }
        } catch (error) {
            console.error('Login API error:', error);
            return { success: false, message: 'Network error during login.' };
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    const authContextValue = {
        user,
        loading,
        login,
        logout,
        isAuthenticated: !!user,
        isVendor: user?.role === 'vendor',
        isSupplier: user?.role === 'supplier',
        isAdmin: user?.role === 'admin',
    };

    return (
        <AuthContext.Provider value={authContextValue}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
    const context = useContext(AuthContext); // <--- Using the directly exported AuthContext
    if (context === undefined) {
        // This error should ideally never be hit if AuthProvider wraps the component
        // but it's a good safeguard.
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};