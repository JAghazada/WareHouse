const productSchema = require("../database/models/productSchema");

const addBasketController = async(req,res)=>{
    const { obj_id,productCount } = req.body
    console.log(productCount)
    const product = await productSchema.find({_id:obj_id});
    if(product!==undefined)
    res.json({product,status:"success"})
    else
    res.json({status:"failed"})
    
}
module.exports = addBasketController