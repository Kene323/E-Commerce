const Seller = require("../model/sellerModel")
const Newsletter = require("../model/newsletterModel")
const Admin = require("../model/adminModel")

// Create a Newsletter
const createNewsletter = async (req, res) =>{
    try{
        const {title, content} = req.body

        const checkSeller = req.user._id
        const checkAdmin = req.user._id        

        const getSeller = await Seller.findById(checkSeller)
        const getAdmin = await Admin.findById(checkAdmin)

        if(!getSeller && !getAdmin){
            return res.status(404).json({
                success: false,
                message: "Enter a seller or admin account to create a newsletter"
            })   
        }

        if(!title || !content){
            return res.status(505).json({
                message: "Properly fill all fields to create a comment"
            })
        }

        const newsletterData = createNewsLetter
            return res.status(200).json({
                success: true,
                message: "Newsletter created successfully",
                data: newsletterData
            })

    }catch(err){
        res.status(500).json({
            success: false,
            message: [err.message, "1"]
        })
    }
}

const getSingleNewsletter = async (req, res)=>{
    try{
        const getTheNewsletter = await Newsletter.findById(req.params.id)
        if(!getTheNewsletter){
            return res.status(404).json({
                success: false,
                message: [err.message, "3"]
            })
        }res.status(201).json({
            success: true,
            message: "Newsletter obtained Succesfully!!",
            result: getTheNewsletter
        })

    }catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

const deleteNewsletter = async (req, res) =>{
    try{
        const delNewsletter = await Newsletter.findById(req.params.id)
        if(!delNewsletter){
            res.status(404).json({
                success: false,
                message: `Newsletter not found: ${err.message}`
            })
        }
        
        await Newsletter.findByIdAndDelete(delNewsletter._id)
        res.status(200).json({
            success: true,
            message: "Newsletter deleted Successfully",
            result: delNewsletter
        })

    }catch(err){
        res.status(500).json({
            success: false,
            message: [err.message, "2"]
        })
    }
}

 // update Admin
 const updateNewsletter = async (req, res)=>{
    try{
        const id = req.params._id
        const news = await Newsletter.findById(id)

        const {content} = req.body
        if(!news) return res.status(404).json({message: "Newsletter doesn't exist"})

        const newsletterUpdate = await Newsletter.findByIdAndUpdate(Newsletter._id, {content}, {new: true})

        res.status(200).json({
            status: "successful",
            data: newsletterUpdate
        })
    }catch(err){
        res.status(500).json({
            status: "failed",
            message: [err.message, "5"]
        })
        console.log(error);
    }
}

const uploadPic = async(req, res)=>{
    try{
        const id = req.user._id
        const Theme = await Newsletter.findById(id)
        if(!Theme){
            return res.status(404).json({
                message: "Newsletter does not exist"
            })
        }

        const files = req.file
        if(!files) throw new AppError(403, "File is required")

        const imageURL = await cloudinary.uploads(files.path)

        const uploadFile = await Newsletter.findByIdAndUpdate(Theme._id, {theme: imageURL.url}, {new: true})

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

module.exports = {createNewsletter, getSingleNewsletter, deleteNewsletter, updateNewsletter, uploadPic}