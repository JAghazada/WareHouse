const productSchema = require("../database/models/productSchema")

const getBill =async (req,res)=>{
    const {date} = req.body
    const products = await productSchema.find({})
    products.map(product=>{
        if(JSON.stringify(product.createdAt).split("T")[0].split('"')[1]===date || JSON.stringify(product.updatedAt).split("T")[0].split(`"`)[1]===date)
        return product;

    })
    
    res.json(products)

}

module.exports = getBill