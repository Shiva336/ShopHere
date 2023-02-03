const router = require("express").Router();
const userModel = require("../models/users");
const bcrypt = require("bcrypt");

router.put("/cart", async(req,res)=> {
    const user = await userModel.findOne({name: req.body.username});
    let flag = 0;
    try { 
        const newCart = {
            orderNumber: user.cart.orderNumber,
            items: user.cart.items,
            total: user.cart.total
        }
        newCart.items.map((product)=> {
        if(product.id === req.body.id)
        {
            flag = 1;
            product.quantity = product.quantity+1
        }
        });
        if(flag == 1) {
            await user.updateOne({ $set: {cart: newCart}});                   
            res.json(user);
        }
             
        if(flag === 0) {
            const newItem = {
                quantity: 1,
                id: req.body.id
            }
            const newCartItem = {
                orderNumber: req.body.number,
                items: user.cart.items,
            }
            newCartItem.items.push(newItem);
            await user.updateOne({ $set: {cart: newCartItem}});
            
            console.log(newCartItem);
            res.status(200).json(user);
        }
    }
    catch(err) {
        res.send(err);
    }
})

module.exports = router;