// IMPORTS
const { error } = require("console")
const Admin = require("../model/adminModel")
const Buyer = require("../model/buyerModel")
const Seller = require("../model/sellerModel")
const Product = require("../model/productModel")
const cloudinary = require("../utils/cloudinary")

const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")
const AppError = require("../AppError")
require("dotenv").config()

// create an Admin
const createAdmin = async (req, res)=>{
    try{
        const {name, email, password} = req.body

// Checking if any field is empty
        if(!name || !email || !password){
            return res.status(500).json({
                message: "All fields must be filled appropriately"
            })
        }

// Checking that the email is used more than once i.e the email doesn't pre-exist
        const checkEmail = await Admin.findOne({email: email})
        if (checkEmail){
            return res.status(500).json({
                message: "Email already exists"
            })
        }

        // hashing Password
    
        const salt = await bcryptjs.genSalt(12)
        const hashPassword = await bcryptjs.hash(password, salt)
    

    // creating password
    const newAdmin = await Admin.create({
        name, email, password:hashPassword
    })
    newAdmin.save()
    return res.status(201).json({
        success: true,
        message: "Admin created successfully",
        data: newAdmin
    })

}catch(err){
    res.status(404).json({
        success: false,
        message: [err.message, "1"]
    })
}
}

// get all admin
const getAdmin = async (req, res) => {
    try{
        const admin = await Admin.find()
        res.status(200).json({
            success: true,
            data: admin
        })
    }catch(err){
        res.staus(500).json({
            success: false,
            error: [err.message, "2"]
        })
    }
}

// get a single admin
const getSingleAdmin = async (req, res)=>{
    try{
        const adminData = await Admin.findById(req.params.id)
        res.status(200).json({
            success: true,
            result: adminData
        })
    }catch(err){
        res.status(500).json({
            success: false,
            message:[err.message, "3"]
        })
    }
}

//signIn Admin
const adminSignIn = async (req, res)=>{
    try{
        const {email, password} = req.body
        const adminDetails = await Admin.findOne({email})
        if(!adminDetails){
            return res.status(404).json({
                success: true,
                message: "Admin does not exist"
            })
        }

        const comparePassword = await bcryptjs.compare(password, adminDetails.password)

        if(!comparePassword) return res.status(403).json({
            message: "Invalid email or Password"
        })

        const token =  await jwt.sign({_id:adminDetails._id},
            process.env.JWTSECRET,
            {expiresIn: "1d"}
        )
        res.status(200).json({
            status: "successful",
            data: token,
        message: "Admin Logged in successfully"        })
        }catch(err){
            res.status(500).json({
                success: "true",
                error: [err.message, "4"]
            })
            console.log(err)
        }
    }

    // update Admin
    const adminUpdate = async (req, res)=>{
        try{
            const id = req.params._id
            const admin = await Admin.findById(id)

            const {name} = req.body
            if(!admin) return res.status(404).json({message: "Admin doesn't exist"})

            const upAdmin = await Admin.findByIdAndUpdate(admin._id, {name}, {new: true})

            res.status(200).json({
                status: "successful",
                data: upAdmin
            })
        }catch(err){
            res.status(500).json({
                status: "failed",
                message: [err.message, "5"]
            })
            console.log(error);
        }
    }

      // Delete Admin
    const deleteAdmin = async (req, res)=>{
        try{
            const delAdmin = await Admin.findById(req.params.id)
            if(!delAdmin){
                res.status(404).json({
                    message: "Admin not found"
                })
            }else{
                await Admin.findByIdAndDelete(delAdmin._id)
                res.status(200).json({
                    success: true,
                    message: "Admin deleted successfully"
                })
            }
        }catch(err){
            res.status(500).json({
                success: false,
                error: [err.message, "6"]
            })
        }
    }

    // Buyers
    const getAllbuyers = async (req, res)=>{
        try{
            const id = req.user._id;
            const adminUser = await Admin.findById(id);
            if(!adminUser) return res.status(403).json({message: "Only admin can perform this operation"})

                const users = await Buyer.find();

            if(users < 1) return res.status(404).json({message: "No user found"});

                res.status(200).json({
                    status: "successful",
                    data: users
                });
        }catch(err){
            res.status(500).json({
                status: "failed",
                message: [error, "7"]
            })
            console.log(error);
        }
    }

    // Sellers
    const getAllsellers = async (req, res)=>{
        try{
            const id = req.user._id;
            const adminUser2 = await Admin.findById(id);
             if(!adminUser2) return res.status(403).json({message: "Only admin can perform this operation 2"})
            
            const users2 = await Seller.find();
            console.log(users2)

            if(users2 < 1) return res.status(404).json({message: "No user found 2"});

                res.status(200).json({
                    status: "successful",
                    data: users2
                });
        }catch(err){
            res.status(500).json({
                status: "failed",
                message: [error, "8"]
            })
            console.log(error);
        }
    }



// get a single Seller
const getSingleSeller = async (req, res)=>{
    try{
        const sellerData = await Seller.findById(req.params.id)
        res.status(200).json({
            success: true,
            result: sellerData
        })
    }catch(err){
        res.status(500).json({
            success: false,
            message:[err.message, "10"]
        })
    }
}

    // Delete Buyer
    const deleteBuyer = async (req, res)=>{
        try{
            const id = req.user._id;
            const adminUser = await Admin.findById(id);
             if(!adminUser) return res.status(403).json({message: "Only admin can perform this operation 2"})
            
            const delBuyer = await Buyer.findById(req.params.id)
            if(!delBuyer){
                res.status(404).json({
                    message: "Buyer not found"
                })
            }else{
                await Buyer.findByIdAndDelete(delBuyer._id)
                res.status(200).json({
                    success: true,
                    message: "Buyer deleted successfully"
                })
            }
        }catch(err){
            res.status(500).json({
                success: false,
                error: [err.message, "11"]
            })
        }
    }

    // update Buyer
    const buyerUpdate = async (req, res)=>{
        try{
            const iden = req.user._id;
            const adminUser = await Admin.findById(iden);
            if(!adminUser) return res.status(403).json({message: "Only admin can perform this operation 2"})
            
            const id = req.params._id
            const buyer = await Buyer.findById(id)

            const {name} = req.body
            if(!buyer) return res.status(404).json({message: "Buyer doesn't exist"})

            const upBuyer = await Buyer.findByIdAndUpdate(Buyer._id, {name}, {new: true})

            res.status(200).json({
                status: "successful",
                data: upBuyer
            })
        }catch(err){
            res.status(500).json({
                status: "failed",
                message: [err.message, "12"]
            })
            console.log(error);
        }
    }

// update Seller
const sellerUpdate = async (req, res)=>{
    try{
        const iden = req.user._id;
        const adminUser = await Admin.findById(iden);
        if(!adminUser) return res.status(403).json({message: "Only admin can perform this operation 2"})
        
        const id = req.params._id
        const seller = await Seller.findById(id)

        const {name} = req.body
        if(!seller) return res.status(404).json({message: "Buyer doesn't exist"})

        const upSeller = await Seller.findByIdAndUpdate(Seller._id, {name}, {new: true})

        res.status(200).json({
            status: "successful",
            data: upSeller
        })
    }catch(err){
        res.status(500).json({
            status: "failed",
            message: [err.message, "13"]
        })
        console.log(error);
    }
}

 // Delete Seller
 const deleteSeller = async (req, res)=>{
    try{
        const id = req.user._id;
        const adminUser = await Admin.findById(id);
         if(!adminUser) return res.status(403).json({message: "Only admin can perform this operation 2"})
        
        const delSeller = await Seller.findById(req.params.id)
        if(!delSeller){
            res.status(404).json({
                message: "Seller not found"
            })
        }else{
            await Seller.findByIdAndDelete(delSeller._id)
            res.status(200).json({
                success: true,
                message: "Seller deleted successfully"
            })
        }
    }catch(err){
        res.status(500).json({
            success: false,
            error: [err.message, "14"]
        })
    }
}


    module.exports = {createAdmin, getAdmin, getSingleAdmin, adminSignIn, adminUpdate, deleteAdmin, getAllbuyers, getAllsellers, getSingleSeller, buyerUpdate, sellerUpdate, deleteSeller, deleteBuyer}