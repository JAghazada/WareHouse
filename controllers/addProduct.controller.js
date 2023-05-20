const productSchema = require("../database/models/productSchema");
const getProductsHelper = require("../helpers/get-products");
const APIError = require("../utils/errors");
const {updateCache} = require("../helpers/cache/update-memory")
const addProductController = async(req,res)=>{
    const {id,count,codes:altercodes} = req.body;
    // * find product
    const products =(await getProductsHelper({_id:id}))[0]
    // * get product's count
    const old_count = products.NumberOfProducts;
    const new_count = old_count + parseInt(count)
    // * get product's subcodes
    let sub_codes = products.QRcode;
    // * if user send any codes,push codes the product QRcode's array
    if(altercodes !== []) altercodes.forEach(code=>sub_codes.push(code));
    // * update count like old_count + count
    productSchema.findOneAndUpdate({_id:id},{
        $set:{NumberOfProducts:new_count,QRcode:sub_codes}
    },
    {
        new:true
    },(err,doc)=>{
        // * if err occured throw apierror
        if(err) throw new APIError("Error Occured",503)
        else{
            updateCache()
            // * if not then send updated product
            res.json({
                product:doc
            })
        }
    })
   
   
   
};

module.exports = addProductController