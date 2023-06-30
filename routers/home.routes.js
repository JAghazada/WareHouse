const homeController = require("../controllers/home.controller");

const router = require("express").Router();

router.get("/home",homeController)
module.exports = router