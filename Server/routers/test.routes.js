const testController = require("../controllers/test.controller")

const router = require("express").Router()
router.get("/test",testController)

module.exports= router