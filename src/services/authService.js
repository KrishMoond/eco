import api from './api';

// API URLs
const AUTH_URL = '/auth';

// Register user
const register = async (userData) => {
  const response = await api.post(`${AUTH_URL}/register`, userData);
  
  if (response.data.success) {
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.user));
  }
  
  return response.data;
};

// Login user
const login = async (userData) => {
  const response = await api.post(`${AUTH_URL}/login`, userData);
  
  if (response.data.success) {
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.user));
  }
  
  return response.data;
};

// Get user profile
const getProfile = async () => {
  const response = await api.get(`${AUTH_URL}/profile`);
  return response.data;
};

// Update user profile
const updateProfile = async (userData) => {
  const response = await api.put(`${AUTH_URL}/profile`, userData);
  
  if (response.data.success) {
    localStorage.setItem('user', JSON.stringify(response.data.user));
  }
  
  return response.data;
};

// Change password
const changePassword = async (passwordData) => {
  const response = await api.put(`${AUTH_URL}/change-password`, passwordData);
  return response.data;
};

// Forgot password
const forgotPassword = async (email) => {
  const response = await api.post(`${AUTH_URL}/forgot-password`, { email });
  return response.data;
};

// Reset password
const resetPassword = async (token, password) => {
  const response = await api.put(`${AUTH_URL}/reset-password/${token}`, { password });
  return response.data;
};

// Logout user
const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

const authService = {
  register,
  login,
  getProfile,
  updateProfile,
  changePassword,
  forgotPassword,
  resetPassword,
  logout,
};

export default authService;