const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Product = require("../models/product.model");

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    phoneNo: req.body.phoneNo,
    address: req.body.address,
  });

  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    res.send({ message: "User was registered successfully!" });
  });
};

exports.signin = (req, res) => {
  User.findOne({
    username: req.body.username,
  })
    .populate("roles", "-__v")
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400, // 24 hours
      });

      res.status(200).send({
        id: user._id,
        username: user.username,
        email: user.email,
        phoneNo: user.phoneNo,
        // roles: authorities,
        address: user.address,
        accessToken: token,
      });
    });
};

exports.adminSignIn = (req, res) => {
  User.findOne({
    username: "admin",
  })
    .populate("roles", "_v")
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: "Admin Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400, // 24 hours
      });

      res.status(200).send({
        id: user._id,
        username: user.username,
        email: user.email,
        phoneNo: user.phoneNo,
        roles: "admin",
        address: user.address,
        accessToken: token,
      });
    });
};

exports.update = async (req, res) => {
  const product = await Product.find({ prodId: "iPhone 111001200" });
  console.log(product);
  // console.log(req.body.userFrom);
  // if (product) {
  //   product.title = req.body.title || product.title;
  //   product.manufacturer = req.body.manufacturer || product.manufacturer;
  //   product.price = req.body.price || product.price;
  //   product.catergory = req.body.catergory || product.catergory;
  //   product.quantity = req.body.quantity || product.quantity;
  //   // product.filePath = req.body.filePath || product.filePath;

  //   if (req.body.prodId) {
  //     product.prodId = req.body.prodId;
  //   }

  //   //const updatedUser = user.save();

  //   var token = jwt.sign({ id: user.id }, config.secret, {
  //     expiresIn: 86400, // 24 hours
  //   });

  //   res.json({
  //     // id: user._id,
  //     title: product.title,
  //     manufacturer: product.manufacturer,
  //     price: product.price,
  //     catergory: product.catergory,
  //     quantity: product.quantity,
  //     accessToken: token,
  //     success: true,
  //   });
  // } else {
  //   res.status(404).send({ message: 'Product Not found.' });
  // }
};
