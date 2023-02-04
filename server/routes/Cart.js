const router = require("express").Router();
const userModel = require("../models/users");
const bcrypt = require("bcrypt");

//add product to cart
router.put("/cart", async(req,res)=> {
    const user = await userModel.findOne({name: req.body.username});
    let flag = 0;
    try { 
        user.cart.items.map((product)=> {
        if(product.id === req.body.id)
        {
            flag = 1;
            product.quantity = product.quantity+1
            user.cart.total++;
        }
        });
        if(flag == 1) {
            await user.updateOne({ $set: {cart: user.cart}});                   
            res.json(user);
        }
             
        if(flag === 0) {
            const newItem = {
                quantity: 1,
                id: req.body.id
            }
            user.cart.items.push(newItem);
            await user.updateOne({ $set: {cart: user.cart}});
            
            console.log(newCartItem);
            res.status(200).json(user);
        }
    }
    catch(err) {
        res.send(err);
    }
});

//get items from a cart
router.put("/show", async(req,res)=> {
    try{
        const user = await userModel.findOne({name: req.body.username});
        res.status(200).json(user.cart);
    }
    catch(err) {
        res.json(err);
    }
})

//reduce quantity by one
router.put("/quantity/decrease", async(req,res)=> {
    try{
        const user = await userModel.findOne({name: req.body.username});
        user.cart.items.map((product)=> {
            if(product.id === req.body.id) {
                if(product.quantity === 0) {
                    const findIndex = user.cart.items.findIndex(product => product.id === req.body.id)
                    findIndex !== -1 && user.cart.items.splice(findIndex , 1)
                }
                else
                    product.quantity--;
            }
        });
        await user.updateOne({ $set: {cart: user.cart}});
        res.status(200).json(user);
    }
    catch(err) {
        res.json(err);
    }
});

//increase quantity by one
router.put("/quantity/increase", async(req,res)=> {
    try{
        const user = await userModel.findOne({name: req.body.username});
        user.cart.items.map((product)=> {
            if(product.id === req.body.id) {    
                product.quantity++;
            }
        });
        await user.updateOne({ $set: {cart: user.cart}});
        res.status(200).json(user);
    }
    catch(err) {
        res.json(err);
    }
})

//delete a product from cart
router.delete("/remove", async(req,res)=> {
    try{
        const user = await userModel.findOne({name: req.body.username});
        const findIndex = user.cart.items.findIndex(product => product.id === req.body.id)
        findIndex !== -1 && user.cart.items.splice(findIndex , 1)
        await user.updateOne({$set: {cart: user.cart}});
        res.status(200).json(user);
    }
    catch(err) {
        res.json(err);
    }
})

//clear the cart
router.delete("/clear", async(req,res)=> {
    try{
        const user = await userModel.findOne({name: req.body.username});
        user.cart.items.splice(0,user.cart.items.length);
        await user.updateOne({$set: {cart: user.cart}});
        res.status(200).json(user);
    }
    catch(err) {
        res.json(err);
    }
})

module.exports = router;