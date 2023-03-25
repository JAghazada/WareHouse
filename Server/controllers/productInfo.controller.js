const productSchema = require("../database/models/productSchema")
const translateJson = require("../routers/Translate/translate.json")
const productInfoController = async(req,res)=>{
    const {obj_id} =req.body
    const products = await productSchema.find({_id:obj_id})
    products.map(product=>{
        product.UnitOfMeasurment = translateJson[product.UnitOfMeasurment.toLowerCase()]
        product.SecondUnitOfMeasurment = translateJson[product.SecondUnitOfMeasurment.toLowerCase()]
        return product
     })
    res.send(products)
    // console.log(product)
}
module.exports = productInfoController