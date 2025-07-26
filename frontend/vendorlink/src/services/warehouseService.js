import axios from 'axios';

const API_URL =  'http://localhost:5000/api';

/**
 * Fetches warehouses based on search and filter criteria
 * @param {Object} params - Search and filter parameters
 * @returns {Promise} Promise that resolves to warehouse data
 */
export const fetchWarehouses = async (params = {}) => {
  try {
    const response = await axios.get(`${API_URL}/warehouses`, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching warehouses:', error);
    throw error;
  }
};

/**
 * Fetches a single warehouse by ID
 * @param {string} id - Warehouse ID
 * @returns {Promise} Promise that resolves to warehouse data
 */
export const fetchWarehouseById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/warehouses/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching warehouse ${id}:`, error);
    throw error;
  }
};

/**
 * Books a slot in a warehouse
 * @param {string} warehouseId - Warehouse ID
 * @param {Object} bookingData - Booking details
 * @returns {Promise} Promise that resolves to booking confirmation
 */
export const bookWarehouseSlot = async (warehouseId, bookingData) => {
  try {
    const response = await axios.post(`${API_URL}/warehouses/${warehouseId}/book`, bookingData);
    return response.data;
  } catch (error) {
    console.error('Error booking warehouse slot:', error);
    throw error;
  }
};

/**
 * Fetches warehouse reviews
 * @param {string} warehouseId - Warehouse ID
 * @returns {Promise} Promise that resolves to reviews data
 */
export const fetchWarehouseReviews = async (warehouseId) => {
  try {
    const response = await axios.get(`${API_URL}/warehouses/${warehouseId}/reviews`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching reviews for warehouse ${warehouseId}:`, error);
    throw error;
  }
};