const productInfoController = require("../controllers/productInfo.controller");

const router = require("express").Router();
router.post("/productInfo",productInfoController)
module.exports = router