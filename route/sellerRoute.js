const express = require("express")
const auth = require("../utils/auth")

const {createSeller ,sellerSignIn, createProduct, getSingleProduct} = require("../controller/sellerController")


const router = express.Router()

router.route("/register").post(createSeller)

router.route("/signIn").post(sellerSignIn)

router.route("/product")
    .post(createProduct)
    .get(getSingleProduct)

module.exports = router
