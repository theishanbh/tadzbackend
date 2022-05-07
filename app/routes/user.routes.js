const {authJwt}  = require("../middlewares");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      console.log(req.header["x-access-token"]),
      console.log(req.header),
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/test/all", controller.allAccess);

  app.get("/api/test/user", [authJwt.verifyToken], controller.userBoard);


//   app.get('/api/addToCart', auth, (req, res) => {

//     User.findOne({ _id: req.user._id }, (err, userInfo) => {
//         let duplicate = false;

//         console.log(userInfo)

//         userInfo.cart.forEach((item) => {
//             if (item.id == req.query.prodID) {
//                 duplicate = true;
//             }
//         })


//         if (duplicate) {
//             User.findOneAndUpdate(
//                 { _id: req.user._id, "cart.id": req.query.prodID },
//                 { $inc: { "cart.$.quantity": 1 } },
//                 { new: true },
//                 (err, userInfo) => {
//                     if (err) return res.json({ success: false, err });
//                     res.status(200).json(userInfo.cart)
//                 }
//             )
//         } else {
//             User.findOneAndUpdate(
//                 { _id: req.user._id },
//                 {
//                     $push: {
//                         cart: {
//                             id: req.query.prodID,
//                             quantity: 1,
//                             date: Date.now()
//                         }
//                     }
//                 },
//                 { new: true },
//                 (err, userInfo) => {
//                     if (err) return res.json({ success: false, err });
//                     res.status(200).json(userInfo.cart)
//                 }
//             )
//         }
//     })
// });
  // app.get(
  //   "/api/test/mod",
  //   [authJwt.verifyToken, authJwt.isModerator],
  //   controller.moderatorBoard
  // );

  // app.get(
  //   "/api/test/admin",
  //   [authJwt.verifyToken, authJwt.isAdmin],
  //   controller.adminBoard
  // );
};
