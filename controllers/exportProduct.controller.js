const productSchema = require("../database/models/productSchema");
const { updateCache } = require("../helpers/cache/update-memory");
const getProductsHelper = require("../helpers/get-products");
const APIError = require("../utils/errors");

const exportProductController = async(req,res) =>{
    const  {exportCount,id} = req.body;
    const product =(await getProductsHelper({_id:id}))[0];
    const new_count = product.NumberOfProducts - exportCount; 
    productSchema.findOneAndUpdate({_id:id},{
        $set:{NumberOfProducts:new_count}
    },{
        new:true
    },(err,doc)=>{
        if(err) throw new APIError("Error occured",5030);
        updateCache();
        res.json({product:doc})
    })
    
}   
module.exports = exportProductController