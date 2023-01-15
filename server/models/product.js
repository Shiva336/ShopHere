const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        min: 3,
        max: 30
    },
    highlights: {
        type: Array,
        require: true,
        default: []
    },
    rating: {
        type: Array,
        default: []
    },
    category: {
        type: String,
        require: true,
        max: 50,
    },
    price: {
        type: String,
        require: true,
    },
    img: {
        type: String,
        default: "",
        require: true
    }, 
    reviews: {
        type: Array,
        default: []
    },
    featured:{
        type: Boolean,
        require: true,
        default: false
    }
},
{ timestamps: true }
);

const Products = mongoose.model("Products", productSchema);
module.exports = Products;


