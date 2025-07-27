
import React, { createContext, useState, useEffect } from 'react';
import { api } from '../utils/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      fetchUser();
    } else {
      setLoading(false);
    }
  }, [token]);

  const fetchUser = async () => {
    try {
      const response = await api.get('/users/profile');
      setUser(response.data);
    } catch (error) {
      console.error('Failed to fetch user:', error);
      logout();
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    try {
      const response = await api.post('/users/login', credentials);
      const accesstoken= response.data.data.accessToken
      const refreshtoken= response.data.data.refreshToken
      console.log(accesstoken);
      console.log(refreshtoken);
      localStorage.setItem('accessToken', accesstoken);
      localStorage.setItem('refreshToken', refreshtoken);

      console.log(response.data);
      
      const userid= response.data.data.userid;
      console.log(userid);
      localStorage.setItem('userId', userid);
      
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  };

  const signup = async (userData) => {
    try {
      const response = await api.post('/users/signup', userData);
      const accesstoken= response.data.data.accessToken
      const refreshtoken= response.data.data.refreshToken
      console.log(accesstoken);
      console.log(refreshtoken);
      localStorage.setItem('accessToken', accesstoken);
      localStorage.setItem('refreshToken', refreshtoken);

      console.log(response.data);
      
      const userid= response.data.data.userid;
      console.log(userid);
      localStorage.setItem('userId', userid);
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    delete api.defaults.headers.common['Authorization'];
  };

  const value = {
    user,
    login,
    signup,
    logout,
    loading,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
