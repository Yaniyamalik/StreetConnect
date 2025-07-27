// client/src/services/api.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // Ensure this matches your backend URL

// Create a single Axios instance
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add auth token to requests if available
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token'); // Assuming you'll store a token on login
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error); // Important: always return rejected promise on error
});

// --- Attach API Call Functions directly to the 'api' instance ---
// This makes them accessible as api.login(), api.register(), etc.
// And avoids duplicate exports.

api.login = async (credentials) => {
    try {
        const response = await api.post('/auth/login', credentials);
        return response.data;
    } catch (error) {
        console.error('Login API error:', error.response?.data || error.message);
        throw error.response?.data || new Error('Network or unexpected error during login');
    }
};

api.register = async (userData) => {
    try {
        const response = await api.post('/auth/register', userData);
        return response.data;
    } catch (error) {
        console.error('Register API error:', error.response?.data || error.message);
        throw error.response?.data || new Error('Network or unexpected error during registration');
    }
};

api.fetchProducts = async (params = {}) => {
    try {
        const response = await api.get('/products', { params });
        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error.response?.data || error.message);
        throw error.response?.data || new Error('Network or unexpected error fetching products');
    }
};

api.fetchProductById = async (id) => {
    try {
        const response = await api.get(`/products/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching product ${id}:`, error.response?.data || error.message);
        throw error.response?.data || new Error('Network or unexpected error fetching product');
    }
};

api.createOrder = async (orderData) => {
    try {
        const response = await api.post('/orders', orderData);
        return response.data;
    } catch (error) {
        console.error('Error creating order:', error.response?.data || error.message);
        throw error.response?.data || new Error('Network or unexpected error creating order');
    }
};

api.getSuppliers = async (query = {}) => {
    try {
        const params = new URLSearchParams(query).toString();
        const response = await api.get(`/suppliers?${params}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching suppliers:', error.response?.data || error.message);
        throw error.response?.data || new Error('Network or unexpected error fetching suppliers');
    }
};

api.getSupplierDetails = async (id) => {
    try {
        const response = await api.get(`/suppliers/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching supplier ${id}:`, error.response?.data || error.message);
        throw error.response?.data || new Error('Network or unexpected error fetching supplier details');
    }
};

// --- Default export the configured axios instance with all methods attached ---
export default api;