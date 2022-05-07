const mongoose = require("mongoose");

const Product = mongoose.model(
  "Product",
  new mongoose.Schema({
    title: String,
    manufacturer: String,
    price: String,
    catergory: String,
    quantity: String,
    prodID: String, 
    images: Array
  })
);

module.exports = Product;