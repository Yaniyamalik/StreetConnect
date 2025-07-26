import axios from 'axios';

const API_URL =  'http://localhost:5000/api';

export const createBooking = async (bookingData) => {
  try {
    const response = await axios.post(`${API_URL}/bookings`, bookingData);
    return response.data;
  } catch (error) {
    console.error('Error creating booking:', error);
    throw error;
  }
};

export const getBookingsByUser = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/bookings/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user bookings:', error);
    throw error;
  }
};

export const cancelBooking = async (bookingId) => {
  try {
    const response = await axios.post(`${API_URL}/bookings/${bookingId}/cancel`);
    return response.data;
  } catch (error) {
    console.error(`Error cancelling booking ${bookingId}:`, error);
    throw error;
  }
};

