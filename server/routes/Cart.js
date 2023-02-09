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
            product.quantity = product.quantity+1;
            product.total+= product.price;
            user.cart.total+= product.price;
        }
        });
        if(flag == 1) {
            await user.updateOne({ $set: {cart: user.cart}});  
            res.json(user);
        }
             
        if(flag === 0) {
            const Cart = {
                orderNumber: req.body.number,
                items: user.cart.items,
                total: user.cart.total
            }
            const newItem = {
                quantity: 1,
                id: req.body.id,
                price: req.body.price,
                total: req.body.price
            }
            Cart.items.push(newItem);
            if(user.cart.total == 0)
                Cart.total = req.body.price;
            else
                Cart.total += req.body.price;
            await user.updateOne({ $set: {cart: Cart}});
            res.status(200).json(user);
        }
    }
    catch(err) {
        res.send(err);
    }
});

//get items from a cart
router.put("/show", async(req,res)=> {
    try {
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
                if(product.quantity === 1) {
                    const findIndex = user.cart.items.findIndex(product => product.id === req.body.id)
                    findIndex !== -1 && user.cart.items.splice(findIndex , 1)
                }
                    product.quantity--;
                    product.total-= product.price;
                    user.cart.total-= product.price;
                
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
                user.cart.total+= product.price;
                product.total+= product.price;
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
router.put("/remove", async(req,res)=> {
    try{
        const user = await userModel.findOne({name: req.body.username});
        const findIndex = user.cart.items.findIndex(product => product.id === req.body.id)
        findIndex !== -1 && (user.cart.total-= user.cart.items[findIndex].price * user.cart.items[findIndex].quantity);
        findIndex !== -1 && user.cart.items.splice(findIndex , 1)
        
        await user.updateOne({$set: {cart: user.cart}});
        res.status(200).json(user);
    }
    catch(err) {
        res.json(err);
    }
})

//clear the cart
router.put("/clear", async(req,res)=> {
    try{
        const user = await userModel.findOne({name: req.body.username});
        user.cart.items.splice(0,user.cart.items.length);
        user.cart.total=0;
        await user.updateOne({$set: {cart: user.cart}});
        res.status(200).json(user);
    }
    catch(err) {
        res.json(err);
    }
})

//add to wishlist
router.put("/wishlist", async(req,res)=> {
    const user = await userModel.findOne({name: req.body.username});
    let flag = 0;
    try { 
        user.wishlist.items.map((product)=> {
        if(product.id === req.body.id)
        {
            flag = 1;
            res.status(200).json({product: "found"});
        }
        });
             
        if(flag === 0) {
            const wish = {
                items: user.wishlist.items,
            }
            const newItem = {
                id: req.body.id,
                price: req.body.price,
            }
            wish.items.push(newItem);
            await user.updateOne({ $set: {wishlist: wish}});
            res.status(200).json(user);
        }
    }
    catch(err) {
        res.send(err);
    }
});

//get items from wishlist
router.put("/wishlist/show", async(req,res)=> {
    try {
        const user = await userModel.findOne({name: req.body.username});
        console.log(user.wishlist);
        res.status(200).json(user.wishlist);
    }
    catch(err) {
        res.json(err);
    }
})

module.exports = router;