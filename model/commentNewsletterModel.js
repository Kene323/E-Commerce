const mongoose = require("mongoose")

const commentSchema = new mongoose.Schema({
comment:{
    type: String,
    required: [true, "Enter a comment"]
},
newsLetter:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Newsletter"
},
buyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Buyer"
}
})

const Comment = mongoose.model("Comment", commentSchema)
module.exports = Comment