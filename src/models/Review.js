const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  rating: {
    type: Number,
    required: [true, 'Rating is required'],
    min: [1, 'Rating must be at least 1'],
    max: [5, 'Rating cannot be more than 5']
  },
  title: {
    type: String,
    maxLength: [100, 'Review title cannot be more than 100 characters'],
    trim: true
  },
  comment: {
    type: String,
    required: [true, 'Review comment is required'],
    maxLength: [1000, 'Review comment cannot be more than 1000 characters'],
    trim: true
  },
  images: [{
    url: String,
    alt: String
  }],
  pros: [String],
  cons: [String],
  isVerifiedPurchase: {
    type: Boolean,
    default: false
  },
  isRecommended: {
    type: Boolean,
    default: true
  },
  helpfulVotes: {
    type: Number,
    default: 0,
    min: 0
  },
  reportedBy: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    reason: String,
    date: {
      type: Date,
      default: Date.now
    }
  }],
  isApproved: {
    type: Boolean,
    default: true
  },
  moderatorNote: String
}, {
  timestamps: true
});

// Compound index to ensure one review per user per product
reviewSchema.index({ product: 1, user: 1 }, { unique: true });
reviewSchema.index({ product: 1, rating: -1 });
reviewSchema.index({ user: 1, createdAt: -1 });
reviewSchema.index({ isApproved: 1 });

// Virtual for review age
reviewSchema.virtual('ageInDays').get(function() {
  return Math.floor((Date.now() - this.createdAt) / (1000 * 60 * 60 * 24));
});

// Method to mark as helpful
reviewSchema.methods.addHelpfulVote = function() {
  this.helpfulVotes += 1;
  return this.save();
};

// Method to report review
reviewSchema.methods.reportReview = function(userId, reason) {
  this.reportedBy.push({
    user: userId,
    reason,
    date: new Date()
  });
  return this.save();
};

// Update product ratings after review save/update/delete
reviewSchema.post('save', async function() {
  await this.model('Product').findById(this.product).then(product => {
    if (product) {
      product.updateRatings();
    }
  });
});

reviewSchema.post('remove', async function() {
  await this.model('Product').findById(this.product).then(product => {
    if (product) {
      product.updateRatings();
    }
  });
});

module.exports = mongoose.model('Review', reviewSchema);