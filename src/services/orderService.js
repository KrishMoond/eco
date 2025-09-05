import api from './api';

const ORDER_URL = '/orders';

// Create new order
const createOrder = async (orderData) => {
  const response = await api.post(ORDER_URL, orderData);
  return response.data.data;
};

// Get user's orders
const getOrders = async (params = {}) => {
  const response = await api.get(ORDER_URL, { params });
  return response.data.data;
};

// Get single order
const getOrder = async (id) => {
  const response = await api.get(`${ORDER_URL}/${id}`);
  return response.data.data;
};

// Cancel order
const cancelOrder = async (id, reason) => {
  const response = await api.put(`${ORDER_URL}/${id}/cancel`, { reason });
  return response.data.data;
};

// Get order statistics
const getOrderStats = async () => {
  const response = await api.get(`${ORDER_URL}/stats`);
  return response.data.data;
};

const orderService = {
  createOrder,
  getOrders,
  getOrder,
  cancelOrder,
  getOrderStats,
};

export default orderService;