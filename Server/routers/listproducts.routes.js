const listProducts = require("../controllers/listProducts.controller")

const router = require("express").Router()
router.get("/products",listProducts)
module.exports= router