const productSchema = require("../database/models/productSchema");
const APIError = require("../utils/errors");
const billSchema = require("../database/models/billSchema")
const Response = require("../utils/response");
const uploadProduct = async (req, res) => {
  let data = JSON.parse(JSON.stringify(req.body));
  let barcodes = []
  data.QRcode.split(",").map(code=>{
    barcodes.push((code))
  })
  data.QRcode = barcodes
  console.log((data.QRcode))
  if(req.file && req.file.originalname) data.image = req.file.originalname;
  const saveProduct = new productSchema(data);
  data["Operation"] = "create";
  data["AmountAdded"] = data.NumberOfProducts;
  const bill = new billSchema(data);
  await bill.save()
  await saveProduct.save()
  .then(async resp=>{
    const io = req.app.get('socketio');
    const product = await productSchema.find({}).sort({ createdAt: -1 });
    io.emit("all-products",{products:product})
    return new Response(resp,"Product Created").created(res)
  }).catch(err=>{
    throw new APIError("Something went wrong!",402)
  })
};
module.exports = uploadProduct;
