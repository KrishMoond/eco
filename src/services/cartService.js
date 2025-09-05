import api from './api';

const CART_URL = '/cart';

// Get user's cart
const getCart = async () => {
  const response = await api.get(CART_URL);
  return response.data.data;
};

// Add item to cart
const addToCart = async (productId, quantity = 1) => {
  const response = await api.post(CART_URL, { productId, quantity });
  return response.data.data;
};

// Update cart item
const updateCartItem = async (productId, quantity) => {
  const response = await api.put(`${CART_URL}/${productId}`, { quantity });
  return response.data.data;
};

// Remove item from cart
const removeFromCart = async (productId) => {
  const response = await api.delete(`${CART_URL}/${productId}`);
  return response.data.data;
};

// Clear cart
const clearCart = async () => {
  const response = await api.delete(CART_URL);
  return response.data.data;
};

const cartService = {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
};

export default cartService;