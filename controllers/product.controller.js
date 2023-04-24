const productSchema = require("../database/models/productSchema");
const APIError = require("../utils/errors");
const billSchema = require("../database/models/billSchema")
const Response = require("../utils/response");
const dateToday = require("../helpers/Date");
const { updateCache } = require("../helpers/cache/update-memory");
const uploadProduct = async (req, res) => {
  let data = JSON.parse(JSON.stringify(req.body));
  let barcodes = []
  data.QRcode.split(",").map(code=>{
    barcodes.push((code))
  })
  data.QRcode = barcodes
  if(req.file && req.file.originalname) data.image = req.file.originalname;
  const saveProduct = new productSchema(data);
  data["Operation"] = "create";
  data["AmountAdded"] = data.NumberOfProducts;
  data["Date"] = dateToday
  const bill = new billSchema(data);
  await bill.save()
  await saveProduct.save()
  .then(async resp=>{
    const io = req.app.get('socketio');
    const product = await productSchema.find({}).sort({ createdAt: -1 });
    io.emit("all-products",{products:product})
    await updateCache()
    return new Response(resp,"Product Created").created(res)
  }).catch(err=>{
    throw new APIError("Something went wrong!",402)
  })
};
module.exports = uploadProduct;
