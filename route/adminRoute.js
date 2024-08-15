const express = require("express")
const auth = require("../utils/auth")

const {createAdmin, getAdmin, getSingleAdmin, adminSignIn, adminUpdate, deleteAdmin, getAllbuyers, getAllsellers, getSingleSeller, buyerUpdate, sellerUpdate, deleteSeller, deleteBuyer} = require("../controller/adminController")

const router = express.Router()

router.route("/register").post(createAdmin)

router.route("/signIn").post(adminSignIn)

router.route("/").get(getAdmin)

router.route("/buyers").get(auth, getAllbuyers)
router.route("/sellers").get(auth,getAllsellers)

router.route("/:id")
    .get(getSingleAdmin)
    .patch(adminUpdate)
    .delete(deleteAdmin)
    .get(auth, getSingleSeller)
    .patch(buyerUpdate)
    .patch(sellerUpdate)
    .delete(deleteSeller)
    .delete(deleteBuyer)
    

module.exports = router