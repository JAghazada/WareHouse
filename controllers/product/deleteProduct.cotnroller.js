const deletedSchema = require("../../database/models/deletedSchema");
const productSchema = require("../../database/models/productSchema");
const { updateCache } = require("../../helpers/cache/update-memory");
const APIError = require("../../utils/errors");
const Response = require("../../utils/response");
const deleteProductController = (req,res)=>{
    const {id} = req.body;
    productSchema.findById(id,(err,product)=>{
        if(err){
            throw new APIError("Xəta baş verdi!",502)
        }
        if(!product){
            throw new APIError("Məhsul Tapılmadı!",502);
        }
        const deletedProduct = new deletedSchema({
            product:product.toObject(),
        })
        deletedProduct.save(err=>{
            if(err){
                throw new APIError("Xəta baş verdi!",502)

            }
            productSchema.findByIdAndRemove(id,async(err)=>{
                if(err){
                    throw new APIError("Xəta baş verdi!",502)
                }
                await updateCache()
                return new Response({message:"Bra deleted"},200).success(res)
            })
        })
    })
}
module.exports = deleteProductController