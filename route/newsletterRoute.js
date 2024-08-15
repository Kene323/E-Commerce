const express = require("express")
const auth = require("../utils/auth")
const upload = require("../utils/multer")

const {createNewsletter, getSingleNewsletter, deleteNewsletter, updateNewsletter, uploadPic} = require("../controller/newsletterController")

const router = express.Router()

router.route("/").post(auth, createNewsletter)

router.route("/:id")
    .get(getSingleNewsletter)
    .delete(deleteNewsletter)
    .patch(updateNewsletter)

router.route("/upload").patch(auth, upload.single("theme"), uploadPic)

module.exports = router