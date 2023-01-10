const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        min: 3,
        max: 30
    },
    highlights: {
        type: String,
        require: true,
        max: 10
    },
    rating: {
        type: Number,
        require: true,
    },
    numberOfRating: {
        type: Number,
        default: 1
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
},
{ timestamps: true }
);

const Products = mongoose.model("Products", productSchema);
module.exports = Products;


