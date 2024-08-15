const mongoose = require("mongoose")
const validator = require("validator")

const adminSchema = new mongoose.Schema({
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
        required: [true, "Enter your Password"]
    }
})

const Admin = mongoose.model("Admin", adminSchema)
module.exports = Admin