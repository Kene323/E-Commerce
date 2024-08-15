const express = require("express")
const auth = require("../utils/auth")
const upload = require("../utils/multer")

const {postReview, getSingleReview, deleteReview} = require("../controller/reviewController")

const router = express.Router()

router.route("/").post(auth, postReview)

router.route("/:id")
    .get(getSingleReview)
    .delete(deleteReview)

module.exports = router