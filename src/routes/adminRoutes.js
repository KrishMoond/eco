const express = require('express');
const router = express.Router();
const {
  getDashboardStats,
  getUsers,
  getUserDetails,
  updateUserStatus,
  getOrdersAdmin,
  updateOrderStatusAdmin,
  getProductsAdmin,
  toggleProductStatus
} = require('../controllers/adminController');
const { protect, admin } = require('../middleware/authMiddleware');

// All admin routes require authentication and admin role
router.use(protect, admin);

// Dashboard
router.get('/dashboard', getDashboardStats);

// User management
router.get('/users', getUsers);
router.get('/users/:id', getUserDetails);
router.put('/users/:id/status', updateUserStatus);

// Order management
router.get('/orders', getOrdersAdmin);
router.put('/orders/:id/status', updateOrderStatusAdmin);

// Product management
router.get('/products', getProductsAdmin);
router.put('/products/:id/status', toggleProductStatus);

module.exports = router;