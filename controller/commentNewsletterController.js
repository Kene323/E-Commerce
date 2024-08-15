const Comment = require("../model/commentNewsletterModel")
const Buyer = require("../model/buyerModel")
const newsletter = require("../model/newsletterModel")
const Mongoose = require("mongoose")


// Post a comment
const postComment = async (req, res) =>{
    try{
        const {comment, newsletterId} = req.body

        const checkBuyer = req.user._id
        
        const getBuyer = await Buyer.findById(checkBuyer)

        if(!getBuyer){
            return res.status(404).json({
                success: false,
                message: "Buyer not found"
            })   
        }

        if(!comment || !newsletterId){
            return res.status(505).json({
                message: "Provide all neccessary data to post a comment"
            })
        }
        const getNewsletter = await newsletter.findById(newsletterId)
        console.log(newsletterId);
        if(!getNewsletter){
            return res.status(404).json({
                success: false,
                message: "Newsletter not found"
            })
        }
        const createComment = await Comment({
            comment
        })
        createComment.buyer = getBuyer._id
        createComment.product = getNewsletter._id
        createComment.save()

        getNewsletter.comment.push(new Mongoose.Types.ObjectId(createComment._id))
        getNewsletter.save()

        const commentData = createComment
            return res.status(200).json({
                success: true,
                message: "Comment posted successfully",
                data: commentData
            })
    }catch(err){
        res.status(500).json({
            success: false,
            message: [err.message, "1"]
        })
    }
}

const getSingleComment = async (req, res)=>{
    try{
        const getAComment = await Comment.findById(req.params.id)
        if(!getAComment){
            return res.status(404).json({
                success: false,
                message: [err.message, "3"]
            })
        }res.status(201).json({
            success: true,
            message: "Comment obtained!!",
            result: getAComment
        })
    }catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

const deleteComment = async (req, res) =>{
    try{
        const delcomment = await Comment.findById(req.params.id)
        if(!delcomment){
            res.status(404).json({
                success: false,
                message: `Comment not found: ${err.message}`
            })
        }
        await Comment.findByIdAndDelete(delcomment._id)
        res.status(200).json({
            success: true,
            message: "Comment deleted Successfully",
            result: delcomment
        })

    }catch(err){
        res.status(500).json({
            success: false,
            message: [err.message, "2"]
        })
    }
}

module.exports = {postComment, getSingleComment, deleteComment}