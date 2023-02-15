const express = require("express")
const { getIndexPage, getAboutPage, getAdminPage } = require("../controllers/pageController")
const router = express.Router()
router.route("/").get(getIndexPage)
router.route("/about").get(getAboutPage)
router.route("/admin").get(getAdminPage)
module.exports = router