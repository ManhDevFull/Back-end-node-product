const mongoose = require("mongoose")
var slug = require('mongoose-slug-updater')
mongoose.plugin(slug);
const productSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    descountPercentage: Number,
    stock: Number,
    thumbnail: String,
    status: String,
    position: Number,
    slug: {
        type: String,
        slug: "title",
        unique: true
    },
    deleted: {
        type: Boolean,
        default: false
    }
},
    {
        timestamps: true
    })
const Product = mongoose.model("Product", productSchema, "products")
module.exports = Product
