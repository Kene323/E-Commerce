const express = require("express")
const auth = require("../utils/auth")

const {postComment, getSingleComment, deleteComment} = require("../controller/commentNewsletterController")

const router = express.Router()

router.route("/").post(auth, postComment)

router.route("/:id")
    .get(getSingleComment)
    .delete(deleteComment)

module.exports = router