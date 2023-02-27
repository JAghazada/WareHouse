const express = require("express")
const { getIndexPage, getAboutPage, getAdminPage } = require("../controllers/pageController")
const router = express.Router()
router.get("/", getIndexPage)
router.get("/about", getAboutPage)
router.get("/admin", getAdminPage)
router.get("/modal",(req,res)=>{
    res.render("modal")
})
module.exports = router