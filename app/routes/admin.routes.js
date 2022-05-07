const express = require('express');
const router = express.Router();
const multer = require('multer');
const { authJwt } = require('../middlewares');

const Product = require("../models/product.model")

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`)
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        if (ext !== '.jpg' || ext !== '.png') {
            return cb(res.status(400).end('only jpg, png are allowed'), false);
        }
        cb(null, true)
    }
})

var upload = multer({ storage: storage }).single("file")

router.post("/uploadImage", (req, res) => {

    upload(req, res, err => {
        if (err) {
            return res.json({ success: false, err })
            console.log(err)
        }
        return res.json({ success: true, image: res.req.file.path, fileName: res.req.file.filename })
    })

});

router.post("/addStock", (req, res) => {

    const product = new Product(req.body)

    product.save((err, product) => {
        if(err) return res.status(400).json({ success: false, err })
        return res.status(200).json({
            success: true 
        })
    })

});

router.post("/getStock", (req, res) => {
        let findArgs = {};
    let term = req.body.searchTerm;

    for (let key in req.body.filters) {
        console.log(key)

        if (req.body.filters[key].length > 0) {
            if (key === "price") {
                findArgs[key] = {
                    $gte: req.body.filters[key][0],
                    $lte: req.body.filters[key][1]
                }
            } else {
                findArgs[key] = req.body.filters[key];
                console.log(req.body.filters[key])

                console.log(findArgs)
            }
        }
    }
    Product.find({})
    .exec((err, products) => {
        if(err) return res.status(400).send(err)
        res.status(200).json({success: true, products})
    })
    
})

// router.post("/getFilterStock", async function (req, res, next) {
//     let findArgs = {};
//     let term = req.body.searchTerm;

//     for (let key in req.body.filters) {
//         console.log(key)

//         if (req.body.filters[key].length > 0) {
//             if (key === "price") {
//                 findArgs[key] = {
//                     $gte: req.body.filters[key][0],
//                     $lte: req.body.filters[key][1]
//                 }
//             } else {
//                 findArgs[key] = req.body.filters[key];
//                 console.log(req.body.filters[key])
//             }
//         }
//     }
//     Product.find({})
//     .exec((err, products) => {
//         if(err) return res.status(400).send(err)
//         res.status(200).json({success: true, products})
//     })


//     // console.log(findArgs)
//     // const { catergory } = req.query;
//     // console.log(catergory);
//     // if (!catergory) return res.send({ products: [] });
//     // let products;
//     // try {
//     //     products = await Product.find(
//     //     { catergory: { $regex: catergory, $options: 'i' } },
//     //   );
//     // } catch (err) {
//     //   console.log(err);
//     //   return res.send({ products: [] });
//     // }

//     // res.send({ products });
//   });


router.post("/", (req, res) => {

    let order = req.body.order ? req.body.order : "desc";
    let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
    let limit = req.body.limit ? parseInt(req.body.limit) : 100;
    let skip = parseInt(req.body.skip);

    let findArgs = {};
    let term = req.body.searchTerm;

    for (let key in req.body.filters) {

        if (req.body.filters[key].length > 0) {
            if (key === "price") {
                findArgs[key] = {
                    $gte: req.body.filters[key][0],
                    $lte: req.body.filters[key][1]
                }
            } else {
                findArgs[key] = req.body.filters[key];
            }
        }
    }

    Product.find({})
    .exec((err, products) => {
        if(err) return res.status(400).send(err)
        res.status(200).json({success: true, products})
    })

    // console.log(findArgs)

    // if (term) {
    //     Product.find(findArgs)
    //         .find({ $text: { $search: term } })
    //         .sort([[sortBy, order]])
    //         .skip(skip)
    //         .limit(limit)
    //         .exec((err, products) => {
    //             if (err) return res.status(400).json({ success: false, err })
    //             res.status(200).json({ success: true, products})
    //         })
    // } else {
    //     Product.find(findArgs)
    //         .sort([[sortBy, order]])
    //         .skip(skip)
    //         .limit(limit)
    //         .exec((err, products) => {
    //             if (err) return res.status(400).json({ success: false, err })
    //             res.status(200).json({ success: true, products})
    //         })
    // }

});


router.post("/updateStock", (req, res) => {
    const prodID = req.body.prodID

    const product = new Product(req.body)

    Product.findOneAndUpdate(prodID, { new: true }, {returnOriginal: false}, function(err, products) {
        if (err) {
          console.log("err", err);
          res.status(500).send(err);
        } else {
          console.log("success");
          res.send(product);
        }
    });

});

router.get('/search/title', async function (req, res, next) {
    const { title } = req.query;
    console.log(title);
    if (!title) return res.send({ products: [] });
    let products;
    try {
        products = await Product.find(
        { title: { $regex: title, $options: 'i' } },
      );
    } catch (err) {
      console.log(err);
      return res.send({ products: [] });
    }

    res.send({ products });
  });

  router.get('/search/catergory', async function (req, res, next) {
    const { catergory } = req.query;
    console.log(catergory);
    if (!catergory) return res.send({ products: [] });
    let products;
    try {
        products = await Product.find(
        { catergory: { $regex: catergory, $options: 'i' } },
      );
    } catch (err) {
      console.log(err);
      return res.send({ products: [] });
    }

    res.send({ products });
  });

module.exports = router;
