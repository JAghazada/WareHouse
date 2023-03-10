const productSchema = require("../database/models/productSchema")

const productInfoController = async(req,res)=>{
    const {obj_id} =req.body
    console.log(req.body)
    const product = await productSchema.find({_id:obj_id})
    res.send(product)
    // console.log(product)
}
module.exports = productInfoController