const express = require('express');
const router = express.Router();
const {
  createReview,
  getReviews,
  getReview,
  updateReview,
  deleteReview,
  addHelpfulVote,
  reportReview
} = require('../controllers/reviewController');
const { protect, admin } = require('../middleware/authMiddleware');

// Public routes
router.get('/', getReviews);
router.get('/:id', getReview);

// Protected routes
router.use(protect);

router.post('/', createReview);
router.put('/:id', updateReview);
router.delete('/:id', deleteReview);
router.put('/:id/helpful', addHelpfulVote);
router.put('/:id/report', reportReview);

module.exports = router;