const productSchema = require("../database/models/productSchema");
const APIError = require("../utils/errors");
const Response = require("../utils/response");
const uploadProduct = async (req, res) => {
  let data = JSON.parse(JSON.stringify(req.body));
  if(req.file && req.file.originalname) data.image = req.file.originalname;
  const saveProduct = new productSchema(data);
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
