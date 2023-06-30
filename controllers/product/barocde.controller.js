const productSchema = require("../../database/models/productSchema");
const { updateCache } = require("../../helpers/cache/update-memory");

const barcodeController =async(req,res)=>{
    const {id,maincode} = req.body;
    productSchema.findOneAndUpdate({_id:id},{
        $set:{MainCode:maincode}
    },{
        new:true
    },(err,doc)=>{
        if(err) return  res.json ({
            "message":"Something went wrong",
            code : 503
        });
        updateCache();
        return res.json({product:doc,message:"success",code:200})
    })
    
}
module.exports = barcodeController