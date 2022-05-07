const mongoose = require("mongoose");

const Order = mongoose.model(
  "Order",
  new mongoose.Schema({
    userID: String,
    items: [{
        prodID: {
            type: String,
        },
        title: String,
        quantity: {
            type: Number
        },
        price: Number
    }],
    bill: String  
  })
);

module.exports = Order;