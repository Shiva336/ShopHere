const router = require("express").Router();
const userModel = require("../models/users");
const bcrypt = require("bcrypt");

router.post("/register",async (req,res)=> {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);

      const newUser = new userModel({
        name: req.body.name,
        phone: req.body.phone,
        address: req.body.address,
        email: req.body.email,
        password: hashedPassword,
        isAdmin: req.body.isAdmin
    });
      const User = await newUser.save();
      res.status(200).json(User);
 }
    catch(error) {
      console.log(error);
    }
});

router.post("/login",async (req,res)=> {
  try{
    const user = await userModel.findOne({ uid: req.body.id });
    !user && res.status(404).json("user not found");

    const validPassword = bcrypt.compare(req.body.password, user.password)
    !validPassword && res.status(400).json("wrong password")

    res.status(200).json(user)
  } 
  catch (err) {
    res.status(500).json(err)
  }
});

module.exports = router;