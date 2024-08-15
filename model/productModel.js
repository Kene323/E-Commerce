const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    quantity:{
        type: Number,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    status:{
        type: Boolean,
        required: true
    },
    productImage: String,
    review:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review"
    }]
})

const Product =mongoose.model("Product", productSchema)
module.exports = Product