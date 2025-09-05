import api from './api';

const PRODUCT_URL = '/products';

// Get all products
const getProducts = async (params = {}) => {
  const response = await api.get(PRODUCT_URL, { params });
  return response.data.data;
};

// Get single product
const getProduct = async (id) => {
  const response = await api.get(`${PRODUCT_URL}/${id}`);
  return response.data.data;
};

// Get featured products
const getFeaturedProducts = async (limit = 8) => {
  const response = await api.get(`${PRODUCT_URL}/featured`, {
    params: { limit }
  });
  return response.data.data;
};

// Search products
const searchProducts = async (params = {}) => {
  const response = await api.get(`${PRODUCT_URL}/search`, { params });
  return response.data.data;
};

// Get products by category
const getProductsByCategory = async (category, params = {}) => {
  const response = await api.get(`${PRODUCT_URL}/category/${category}`, { params });
  return response.data.data;
};

// Get product reviews
const getProductReviews = async (productId, params = {}) => {
  const response = await api.get(`${PRODUCT_URL}/${productId}/reviews`, { params });
  return response.data.data;
};

const productService = {
  getProducts,
  getProduct,
  getFeaturedProducts,
  searchProducts,
  getProductsByCategory,
  getProductReviews,
};

export default productService;