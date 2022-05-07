const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    phoneNo: String, 
    address: String,
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user'
    }
  })
);

module.exports = User;
