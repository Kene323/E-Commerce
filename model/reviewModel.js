const mongoose = require("mongoose")

const reviewSchema = new mongoose.Schema({
comment:{
    type: String,
    required: true
},
product:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product"
},
buyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Buyer"
}
})

const Review = mongoose.model("Review", reviewSchema)
module.exports = Review