const express = require("express")
const auth = require("../utils/auth")
const upload = require("../utils/multer")

const {createBuyer ,buyerSignIn, getSingleBuyer, uploadAvatar} = require("../controller/buyerController")


const router = express.Router()

router.route("/register").post(createBuyer)

router.route("/signIn").post(buyerSignIn)

router.route("/buyerId").get(auth, getSingleBuyer)

router.route("/upload").patch(auth, upload.single("avatar"), uploadAvatar)

module.exports = router
