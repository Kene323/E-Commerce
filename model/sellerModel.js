const mongoose = require("mongoose")
const validator = require("validator")

const sellerSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "Please fill in your name"]
    },
    email:{
        type: String,
        required: [true, "Please fill in your email"],
        lowercase: true,
        validate: [validator.isEmail, "Invalid Email Provided"]
    },
    password:{
        type: String,
        required: [true, "Enter your Password"],
        minlength: 8
    }
})

const Seller = mongoose.model("Seller", sellerSchema)
module.exports = Seller