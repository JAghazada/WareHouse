const listProducts = require("../controllers/listProducts.controller")
const searchProduct = require("../controllers/search.controller")
const productSchema = require("../database/models/productSchema")
const {requireLogin} = require("../middlewares/auth/requireLogin")

const router = require("express").Router()
router.get("/products",requireLogin,listProducts)
router.post("/getProducts",searchProduct)


// ! delete method 
router.delete("/deleteAll",(req,res)=>{
    productSchema.deleteMany({},(err)=>{
        if(err)res.json(err)
        else res.json("success")
    })

})
module.exports= router