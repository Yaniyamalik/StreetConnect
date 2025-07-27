import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const getCapsules = async (warehouseId) => {
  try {
    const response = await axios.get(`${API_URL}/warehouses/${warehouseId}/capsules`);
    return response.data;
  } catch (error) {
    console.error('Error fetching capsules:', error);
    throw error;
  }
};

export const getCapsuleById = async (warehouseId, capsuleId) => {
  try {
    const response = await axios.get(`${API_URL}/warehouses/${warehouseId}/capsules/${capsuleId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching capsule ${capsuleId}:`, error);
    throw error;
  }
};


