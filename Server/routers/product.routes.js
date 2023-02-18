const express= require("express");
const uploadProduct = require("../controllers/product.controller");
const upload = require("../middlewares/lib/upload/upload");
const ProductValidation = require("../middlewares/validation/product.validation");
const router = express.Router()
router.post("/uploadProduct",ProductValidation.addProduct,uploadProduct)

module.exports = router
