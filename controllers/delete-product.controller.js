const productSchema = require("../database/models/productSchema")
const { updateCache } = require("../helpers/cache/update-memory")

const deleteProductController = (req,res) =>{
    const {product_id} = req.body
     productSchema.findOneAndDelete({_id:product_id},async(err,product)=>{
        if(err) res.json({
            success:false,
            message:"Xeta baş verdi"
        })
        await updateCache()
        res.json({
            success:true,
            message:"Produckt silindi"
        })
    })
}
module.exports = deleteProductController