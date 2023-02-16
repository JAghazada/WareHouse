const router = require("express").Router()
const auth = require("./auth.routes")
const admin = require("./admin.routes")
const page = require("./page.routes")
router.use(page)
router.use(admin)
router.use(auth)
module.exports = router