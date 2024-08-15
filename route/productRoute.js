const express = require("express")
const auth = require("../utils/auth")
const upload = require("../utils/multer")

const {createProduct, getSingleProduct, getAllProduct, uploadProductImage} = require("../controller/productController")

const router = express.Router()

router.route("/")
    .post(auth, createProduct)
    .get(getAllProduct)

router.route("/:productId")
    .get(getSingleProduct)
    .patch(auth, upload.single("productImage"),uploadProductImage)


module.exports = router