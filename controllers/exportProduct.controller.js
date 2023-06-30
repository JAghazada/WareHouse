const getProductsHelper = require("../helpers/get-products");
const { saveToRedis, getFromRedis, getTotalRedisData } = require("../helpers/redis-cache");
const jwt = require("jsonwebtoken")
const exportProductController = async(req,res) =>{
    const  {exportCount,id} = req.body;
    const token = req.cookies.auth;
    const userID = jwt.decode(token).userID;
    if(!userID){
        return res.json({
            userID,
            message:"dur ciccir"
        })
    }
    const productDetails =(await getProductsHelper({_id:id}))[0];
    if(!productDetails) return res.json({message:"product not found"});
    const product = {
        id,
        count:exportCount,
        name:productDetails.ProductName,
        price : productDetails.SellingPrice,
        maincode : productDetails.MainCode,
        numberofproduct : productDetails.NumberOfProducts,
        link:productDetails.Link
    };
    const status = await saveToRedis("export",userID,product);
    
    const totalOrders =await  getTotalRedisData(userID);
    return res.status(200).json({
            message: 'Product added to cart',
            success: true,
            orders:totalOrders,
            status,
    })
    
}   
module.exports = exportProductController