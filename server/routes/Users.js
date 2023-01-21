const router = require("express").Router();
const userModel = require("../models/users");
const bcrypt = require("bcrypt");

//update
router.put("/:id",async (req,res)=> {
  if(req.body.uid === req.params.uid || req.body.isAdmin) {
    try {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password,salt);
    }
    catch(error) {
      return res.status(500).json(error);
    }

    try {
      const user = await userModel.findByIdAndUpdate(req.params.id,{ $set: req.body });
      res.status(200).json("Account updated");
    }
    catch(err) {
      return res.json(err);
    }
  }
  else {
    return res.status(403).json("you can delete only your account");
  }
});

//delete 
router.delete("/:id",async (req,res)=> {
  if(req.body.uid === req.params.uid || req.body.isAdmin) {
    try {
      const user = await userModel.findByIdAndDelete(req.params.id);
      res.status(200).json(user);
    }
    catch(error) {
      return res.status(500).json(error);
    }
  }
  else {
    return res.status(403).json("you can delete only your account");
  }
});

//get a user
router.get("/:id", async (req,res)=> {
  try{
    const user =  await userModel.findById(req.params.id);
    const {password,updatedAt, ...other} = user._doc; //what is is this line?
    res.status(200).json(other);
  }
  catch(err) {
    return res.status(500).json(error);
  }
});


module.exports = router;