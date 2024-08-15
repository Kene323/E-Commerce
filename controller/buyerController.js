const Buyer = require("../model/buyerModel")
const cloudinary = require("../utils/cloudinary")
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")
const AppError = require("../AppError")
require("dotenv").config()

// create a Buyer
const createBuyer = async (req, res)=>{
    try{
        const {name, email, password} = req.body

// Checking if any field is empty
        if(!name || !email || !password){
            return res.status(500).json({
                message: "All fields must be filled appropriately"
            })
        }

// Checking that the email is used more than once i.e the email doesn't pre-exist
        const checkEmail = await Buyer.findOne({email: email})
        if (checkEmail){
            return res.status(500).json({
                message: "Email already exists"
            })
        }

        // hashing Password
    
        const salt = await bcryptjs.genSalt(12)
        const hashPassword = await bcryptjs.hash(password, salt)
    

    // creating password
    const newBuyer = await Buyer.create({
        name, email, password:hashPassword
    })
    newBuyer.save()
    return res.status(201).json({
        success: true,
        message: "Buyer created successfully",
        data: newBuyer
    })

}catch(err){
    res.status(404).json({
        success: false,
        message: [err.message, "1"]
    })
}
}

// Sigin Buyer
const buyerSignIn = async (req, res)=>{
    try{
        const {email, password} = req.body
        const buyerDetails = await Buyer.findOne({email})
        if(!buyerDetails){
            return res.status(404).json({
                success: true,
                message: "Buyer does not exist"
            })
        }

        const comparePassword = await bcryptjs.compare(password, buyerDetails.password)

        if(!comparePassword) return res.status(403).json({
            message: "Invalid email or Password"
        })

        const token =  await jwt.sign({_id:buyerDetails._id},
            process.env.JWTSECRET,
            {expiresIn: "1d"}
        )
        res.status(200).json({
            status: "successful",
            data: token,
        message: "Buyer Logged in successfully"        })
        }catch(err){
            res.status(500).json({
                success: "true",
                error: [err.message, "2"]
            })
        }
    }

    // get a single Buyer
const getSingleBuyer = async (req, res)=>{
    try{

        const buyerData = await Buyer.findById(req.params.buyerId)
        console.log(buyerData);
        if(!buyerData){return res.status(404).json({
            message: "user doesn't exist"
        })}
        res.status(200).json({
            success: true,
            result: buyerData
        })
    }catch(err){
        res.status(500).json({
            success: false,
            message:[err.message, "9"]
        })
        console.log(err);
    }
}

const uploadAvatar = async(req, res)=>{
    try{
        const id = req.user._id
        const user = await Buyer.findById(id)
        if(!user){
            return res.status(404).json({
                message: "User does not exist"
            })
        }

        const files = req.file
        if(!files) throw new AppError(403, "File is required")

        const imageURL = await cloudinary.uploads(files.path)

        const uploadFile = await Buyer.findByIdAndUpdate(user._id, {avatar: imageURL.url}, {new: true})

        res.status(200).json({
            status: "successful",
            data: uploadFile
        })
    }catch(err){
        res.status(500).json({
            status: "Failed",
            message: err.message
        })
    }
}

    module.exports = {createBuyer ,buyerSignIn, getSingleBuyer, uploadAvatar}