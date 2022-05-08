const mongoose = require("mongoose");

const Cart = mongoose.model(
  "Cart",
  new mongoose.Schema({
    userID: String,
    items: [
      {
        prodID: {
          type: String,
        },
        title: String,
        quantity: {
          type: Number,
        },
        price: Number,
      },
    ],
    bill: Number,
  })
);

module.exports = Cart;
