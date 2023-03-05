const listProducts = require("../controllers/listProducts.controller")
const productSchema = require("../database/models/productSchema")

const router = require("express").Router()
router.get("/products",listProducts)
router.post("/getProducts",(req,res)=>{
        console.log(req.body)
       return  res.json(req.body)
})
router.delete("/deleteAll",(req,res)=>{
    productSchema.deleteMany({},(err)=>{
        if(err)res.json(err)
        else res.json("success")
    })

})
module.exports= router