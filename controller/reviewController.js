const { error } = require("console")
const Review = require("../model/reviewModel")
const Buyer = require("../model/buyerModel")
const Product = require("../model/productModel")
const Mongoose = require("mongoose")


// Post a review
const postReview = async (req, res) =>{
    try{
        const {comment, productId} = req.body

        const checkBuyer = req.user._id
        
        const getBuyer = await Buyer.findById(checkBuyer)

        if(!getBuyer){
            return res.status(404).json({
                success: false,
                message: "Buyer not found"
            })   
        }

        if(!comment || !productId){
            return res.status(505).json({
                message: "Provide all neccessary data to post a comment"
            })
        }
        const getProduct = await Product.findById(productId)
        console.log(productId);
        if(!getProduct){
            return res.status(404).json({
                success: false,
                message: "Product not found"
            })
        }
        const createReview = await Review({
            comment
        })
        createReview.buyer = getBuyer._id
        createReview.product = getProduct._id
        createReview.save()

        getProduct.review.push(new Mongoose.Types.ObjectId(createReview._id))
        getProduct.save()

        const reviewData = createReview
            return res.status(200).json({
                success: true,
                message: "Review posted successfully",
                data: reviewData
            })
    }catch(err){
        res.status(500).json({
            success: false,
            message: [err.message, "1"]
        })
    }
}

const getSingleReview = async (req, res)=>{
    try{
        const reviewFetch = await Review.findById(req.params.id)
        if(!reviewFetch){
            return res.status(404).json({
                success: false,
                message: [err.message, "3"]
            })
        }res.status(201).json({
            success: true,
            message: "Review obtained!!",
            result: reviewFetch
        })
    }catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

const deleteReview = async (req, res) =>{
    try{
        const delReview = await Review.findById(req.params.id)
        if(!delReview){
            res.status(404).json({
                success: false,
                message: `Review not found: ${err.message}`
            })
        }
        await Review.findByIdAndDelete(delReview._id)
        res.status(200).json({
            success: true,
            message: "Review deleted Successfully",
            result: delReview
        })

    }catch(err){
        res.status(500).json({
            success: false,
            message: [err.message, "2"]
        })
    }
}

module.exports = {postReview, getSingleReview, deleteReview}