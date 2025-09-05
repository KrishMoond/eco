const Review = require('../models/Review');
const Product = require('../models/Product');
const Order = require('../models/Order');

// Create review
const createReview = async (req, res) => {
  try {
    const { product, rating, title, comment, pros, cons, isRecommended } = req.body;

    // Check if product exists
    const productExists = await Product.findById(product);
    if (!productExists) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Check if user has already reviewed this product
    const existingReview = await Review.findOne({ product, user: req.user.id });
    if (existingReview) {
      return res.status(400).json({
        success: false,
        message: 'You have already reviewed this product'
      });
    }

    // Check if user has purchased this product
    const hasPurchased = await Order.findOne({
      user: req.user.id,
      'items.product': product,
      orderStatus: 'delivered'
    });

    const review = await Review.create({
      product,
      user: req.user.id,
      rating,
      title,
      comment,
      pros: pros || [],
      cons: cons || [],
      isRecommended: isRecommended !== false,
      isVerifiedPurchase: !!hasPurchased
    });

    // Populate user info for response
    await review.populate('user', 'name avatar');

    // Update product ratings
    await productExists.updateRatings();

    res.status(201).json({
      success: true,
      message: 'Review created successfully',
      data: review
    });
  } catch (error) {
    console.error('Create review error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Get reviews with pagination and filtering
const getReviews = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Build query
    let query = { isApproved: true };
    
    if (req.query.product) {
      query.product = req.query.product;
    }

    if (req.query.rating) {
      query.rating = parseInt(req.query.rating);
    }

    if (req.query.verified === 'true') {
      query.isVerifiedPurchase = true;
    }

    // Build sort
    let sort = { createdAt: -1 };
    if (req.query.sort === 'rating') {
      sort = { rating: -1, createdAt: -1 };
    } else if (req.query.sort === 'helpful') {
      sort = { helpfulVotes: -1, createdAt: -1 };
    }

    const reviews = await Review.find(query)
      .populate('user', 'name avatar')
      .populate('product', 'name images')
      .sort(sort)
      .skip(skip)
      .limit(limit);

    const total = await Review.countDocuments(query);

    res.json({
      success: true,
      data: {
        reviews,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit)
        }
      }
    });
  } catch (error) {
    console.error('Get reviews error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Get single review
const getReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id)
      .populate('user', 'name avatar')
      .populate('product', 'name images');

    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found'
      });
    }

    res.json({
      success: true,
      data: review
    });
  } catch (error) {
    console.error('Get review error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Update review (user can only update their own review)
const updateReview = async (req, res) => {
  try {
    const review = await Review.findOne({
      _id: req.params.id,
      user: req.user.id
    });

    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found or unauthorized'
      });
    }

    const { rating, title, comment, pros, cons, isRecommended } = req.body;

    // Update fields
    if (rating) review.rating = rating;
    if (title !== undefined) review.title = title;
    if (comment) review.comment = comment;
    if (pros) review.pros = pros;
    if (cons) review.cons = cons;
    if (isRecommended !== undefined) review.isRecommended = isRecommended;

    await review.save();

    // Update product ratings
    const product = await Product.findById(review.product);
    if (product) {
      await product.updateRatings();
    }

    // Populate for response
    await review.populate('user', 'name avatar');

    res.json({
      success: true,
      message: 'Review updated successfully',
      data: review
    });
  } catch (error) {
    console.error('Update review error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Delete review (user can only delete their own review)
const deleteReview = async (req, res) => {
  try {
    const review = await Review.findOne({
      _id: req.params.id,
      user: req.user.id
    });

    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found or unauthorized'
      });
    }

    const productId = review.product;
    await review.remove();

    // Update product ratings
    const product = await Product.findById(productId);
    if (product) {
      await product.updateRatings();
    }

    res.json({
      success: true,
      message: 'Review deleted successfully'
    });
  } catch (error) {
    console.error('Delete review error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Add helpful vote to review
const addHelpfulVote = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found'
      });
    }

    await review.addHelpfulVote();

    res.json({
      success: true,
      message: 'Helpful vote added',
      data: { helpfulVotes: review.helpfulVotes }
    });
  } catch (error) {
    console.error('Add helpful vote error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Report review
const reportReview = async (req, res) => {
  try {
    const { reason } = req.body;

    if (!reason) {
      return res.status(400).json({
        success: false,
        message: 'Report reason is required'
      });
    }

    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found'
      });
    }

    // Check if user has already reported this review
    const hasReported = review.reportedBy.some(
      report => report.user.toString() === req.user.id.toString()
    );

    if (hasReported) {
      return res.status(400).json({
        success: false,
        message: 'You have already reported this review'
      });
    }

    await review.reportReview(req.user.id, reason);

    res.json({
      success: true,
      message: 'Review reported successfully'
    });
  } catch (error) {
    console.error('Report review error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

module.exports = {
  createReview,
  getReviews,
  getReview,
  updateReview,
  deleteReview,
  addHelpfulVote,
  reportReview
};