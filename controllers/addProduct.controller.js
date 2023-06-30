const getProductsHelper = require("../helpers/get-products");
const jwt = require("jsonwebtoken");
const { saveToRedis, getTotalRedisData } = require("../helpers/redis-cache");
const addProductController = async(req,res)=>{
    const {id,count,codes} = req.body;
    const token = req.cookies.auth;
     const userID = jwt.decode(token).userID;
     if(!userID){
      return res.json({
        message:"please sign in",
        success:false
      })
     }
    const productDetails =(await getProductsHelper({_id:id}))[0];
    if(!productDetails) return res.json({message:"product not found"});
    const product = {
        id,
        count,
        new_barcodes:codes,
        name:productDetails.ProductName,
        price : productDetails.SellingPrice,
        maincode : productDetails.MainCode,
        numberofproduct : productDetails.NumberOfProducts,
        link:productDetails.Link

    };
    await saveToRedis("add",userID,product)
    const totalOrders = await getTotalRedisData(userID);
      res.status(200).json({
        message: 'success',
        success: true,
        userID,
        totalOrders
      });
    
   
   
};

module.exports = addProductController