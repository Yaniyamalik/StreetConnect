// src/services/authService.js
import axios from 'axios';

export const signup = async (data) => {
  const response = await axios.post('http://localhost:5000/api/users/signup', data, {
    withCredentials: true, // for cookie/token
  });
  return response.data;
};

export const login=async (data)=>{
  const response = await axios.post('http://localhost:5000/api/users/login', data, {
    withCredentials: true, // for cookie/token
  });
  return response.data;
}
export const logout = async () => {
  const response = await axios.post('http://localhost:5000/api/users/logout', {}, {
    withCredentials: true, // for cookie/token
  });
  return response.data;
}
export const getProfile = async () => {
  const res = await axios.get('http://localhost:5000/api/v1/user/profile');
  return res.data.data; // { user: { name, email, ... } }
};