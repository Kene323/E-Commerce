const Seller = require("../model/sellerModel")
const Product = require("../model/productModel")
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")
require("dotenv").config()

// create a Buyer
const createSeller = async (req, res)=>{
    try{
        const {name, email, password} = req.body

// Checking if any field is empty
        if(!name || !email || !password){
            return res.status(500).json({
                message: "All fields must be filled appropriately"
            })
        }

// Checking that the email is used more than once i.e the email doesn't pre-exist
        const checkEmail = await Seller.findOne({email: email})
        if (checkEmail){
            return res.status(500).json({
                message: "Email already exists"
            })
        }

        // hashing Password
    
        const salt = await bcryptjs.genSalt(12)
        const hashPassword = await bcryptjs.hash(password, salt)
    

    // creating password
    const newSeller = await Seller.create({
        name, email, password:hashPassword
    })
    newSeller.save()
    return res.status(201).json({
        success: true,
        message: "Seller created successfully",
        data: newSeller
    })

}catch(err){
    res.status(404).json({
        success: false,
        message: [err.message, "1"]
    })
}
}

// Sigin Seller
const sellerSignIn = async (req, res)=>{
    try{
        const {email, password} = req.body
        const sellerDetails = await Seller.findOne({email})
        if(!sellerDetails){
            return res.status(404).json({
                success: true,
                message: "Seller does not exist"
            })
        }

        const comparePassword = await bcryptjs.compare(password, sellerDetails.password)

        if(!comparePassword) return res.status(403).json({
            message: "Invalid email or Password"
        })

        const token =  await jwt.sign({_id:sellerDetails._id},
            process.env.JWTSECRET,
            {expiresIn: "1d"}
        )
        res.status(200).json({
            status: "successful",
            data: token,
        message: "seller Logged in successfully"        })
        }catch(err){
            res.status(500).json({
                success: "true",
                error: [err.message, "2"]
            })
        }
    }

    const createProduct = async (req, res)=>{
        try{
            const {name, quantity, price, description, status} = req.body
    
    // Checking if any field is empty
            if(!name || !quantity || !price || description || status){
                return res.status(500).json({
                    message: "All required fields must be filled to create a product"
                })
            }
    
        const newProduct = await Product.create({
            name, quantity, price, description, status
        })
        newProduct.save()
        return res.status(201).json({
            success: true,
            message: "Product created successfully",
            data: newProduct
        })
    
    }catch(err){
        res.status(404).json({
            success: false,
            message: [err.message]
        })
    }
    }

    const getSingleProduct = async (req, res)=>{
        try{
            const productData = await Product.findById(req.params.id)
            res.status(200).json({
                success: true,
                result: productData
            })
        }catch(err){
            res.status(500).json({
                success: false,
                message:[err.message, "3"]
            })
        }
    }

    module.exports = {createSeller ,sellerSignIn, createProduct, getSingleProduct}