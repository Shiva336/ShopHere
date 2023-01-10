const router = require("express").Router();
const productModel = require("../models/product");

//get all products
router.get("/", async(req,res)=> {
  try{
    const products =  await productModel.find({});
    res.status(200).json(products);
  }
  catch(err) {
    return res.status(500).json(error);
  }
});

//get products by category
router.get("/:category", async(req,res)=> {
    try{
        const products = await productModel.find({ category: req.params.category});
        res.status(200).json(products);
      }
      catch(err) {
        return res.status(500).json(err);
      }
});

//add product
router.post("/", async(req,res)=> {
    try {
        const newProduct = new productModel({
            name: req.body.name,
            highlights: req.body.highlights,
            rating: req.body.rating,
            category: req.body.category,
            price: req.body.price,
            img: req.body.img,
            reviews: req.body.reviews,
        });

        const Product = await newProduct.save();
        res.status(200).json(Product);
    }
    catch(err) {
        return res.status(500).json(err);
    }
});

//update rating
router.put("/:id", async(req,res)=> {
    try {
        const product = productModel.findById(req.params.id);
        let num = product.numberOfRating;
        let rating = product.rating*num;
    }catch(err) {
        
    }
});

//update review

module.exports = router;