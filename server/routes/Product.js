const router = require("express").Router();
const productModel = require("../models/product");

//get all products
router.get("/", async(req,res)=> {
  try{
    const products =  await productModel.find({});  
    res.status(200).json(products);
  }
  catch(err) {
    return res.status(500).json(err);
  }
});

//get one product
router.get("/:id", async(req,res)=> {
  try{
    const products =  await productModel.findById(req.params.id);
    console.log(products);
    res.status(200).json(products);
  }
  catch(err) {
    return res.status(500).json(err);
  }
});

//get products by category
router.get("/category/:category", async(req,res)=> {
    try{
        const products = await productModel.find({ category: req.params.category});
        res.status(200).json(products);
      }
      catch(err) {
        return res.status(500).json(err);
      }
});

//get products by search
router.get("/search/term", async(req,res)=> {
  try{
      const products = await productModel.find({ name: new RegExp('^'+ req.body.term,"i")});
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
router.put("/:id/rating", async(req,res)=> {
    try {
        const product = productModel.findById(req.params.id);
        await product.updateOne({ $push: { rating: req.body.newrating} });
        res.status(200).json("The rating has been updated");
    }
    catch(err) {
        console.log(err);
    }
});

//update review
router.put("/:id/review", async(req,res)=> {
  try {
      const product = productModel.findById(req.params.id);
      await product.updateOne({ $push: { rating: req.body.newreview} });
      res.status(200).json("The rewview has been updated");
  }
  catch(err) {
      console.log(err);
  }
});


module.exports = router;