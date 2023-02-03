const mongoose = require("mongoose");
const Product = require("./product")

const cartSchema = new mongoose.Schema({
    orderNumber: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true
    },
    items: {
        type: Array,
        required: true
    },
    total: {
        type: Number,
        default: 0
    }
},
{ timestamps: true }
);

const Carts = mongoose.model("Carts", cartSchema);
module.exports = Carts;


