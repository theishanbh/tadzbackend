const mongoose = require('mongoose');

const Review = mongoose.model(
  "Review",
  new mongoose.Schema({
    prodID: String,
    productTitle: String,
    reviewId: String,
    content: String,
    author: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ]
  })
);

module.exports = Review;