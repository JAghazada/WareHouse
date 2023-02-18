const upload = require("../middlewares/lib/upload/upload")
const multer = require("multer")
const APIError = require("../utils/errors")
const Response = require("../utils/response")
const uploadProduct = async (req, res) => {
  const {
    ProductName,
    NumberOfProducts,
    UnitOfMeasurment,
    PurchasePrice,
    SellingPrice,
    QRcode,
    İmage,
  } = req.body;
  console.log(req.body)
  res.json(req.body)
  req.body = {
    "Image":Image
  }
//   upload(req,res,function (err){
//     if(err instanceof multer.MulterError)
//         throw new APIError("Something went wrong when image upload",400)
//     else if(err)
//         // throw new APIError("Something went wrong when image upload",400)
//         console.log(err)
//     //    res.status(403).json({
//         // message:`Accepted file types :["image.jpg","image.png","image.jpeg","image.gif"]`
//     //    })

//     else
//         return new Response(req.savedImages,"upload is successful").success(res) 
// })
};
module.exports = uploadProduct