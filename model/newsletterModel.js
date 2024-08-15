const mongoose = require("mongoose")

const newsletterSchema = new mongoose.Schema({
    title:{
        type: String,
        required: [true, "Please enter the title of the newsletter"]
    },

    theme: String,

    content:{
        type: String,
        required: [true, "Provide a description or content for the newsletter"]
    },
    newsletterComment:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    },
    buyer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Buyer"
    }

})

const Newsletter = mongoose.model("newsletter", newsletterSchema)
module.exports = Newsletter