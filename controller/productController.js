// Imports
const Product = require("../model/productModel")
const Seller = require("../model/sellerModel")
const Admin = require("../model/adminModel")

const cloudinary = require("../utils/cloudinary")
const AppError = require("../AppError")
const jwt = require("jsonwebtoken")
const bcryptjs = require("bcryptjs")
require("dotenv").config()

const createProduct = async (req, res)=>{
    try{
        const id = req.user._id
        const admin = await Admin.findById(id)
        const seller = await Seller.findById(id)
        
        if(!admin && !seller){
            return res.status(404).json({
                success: false,
                message: "Admin or Seller not found"
            })
        }

        const {name, quantity, price, description, status} = req.body

// Checking if any field is empty
        if(!name || !quantity || !price || !description || !status){
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
        message: [err.message, "1"]
    })
}
}

const getSingleProduct = async (req, res)=>{
    try{
        const productData = await Product.findById(req.params.productId)

        if(!productData){
            return res.status(404).json({
                success: false,
                message: "Product not found"
            })
        }
        res.status(200).json({
            success: true,
            result: productData
        })
    }catch(err){
        res.status(500).json({
            success: false,
            message:[err.message, "2"]
        })
    }
}

const getAllProduct = async (req, res) => {
    try{
        const product = await Product.find()
        res.status(200).json({
            success: true,
            data: product
        })
    }catch(err){
        res.staus(500).json({
            success: false,
            error: [err.message, "3"]
        })
    }
}

const uploadProductImage = async(req, res) =>{
    try{
        const id = req.user._id
        const productId = req.params.productId
        const user = await Admin.findById(id)
        if(!user){
            return res.status(404).json({
                message: "User does not exist"
            })
        }
        const product = await Product.findById(productId)
        if(!product){
            return res.status(404).json({
                message: "product does not exist"
            })
        }

        const files = req.file
        if(!files) throw new AppError(403, "File Required")

            const imageURL = await cloudinary.uploads(files.path)

            const uploadFile = await Product.findByIdAndUpdate(product._id, {productImage: imageURL.url}, {new: true})

            res.status(200).json({
                status: "successful",
                data: uploadFile
            })
    }catch(err){
        res.status(500).json({
            status: "Failed",
            message: [err.message, "4"]
        })
    console.log(err);
}
}

module.exports = {createProduct, getSingleProduct, getAllProduct, uploadProductImage}