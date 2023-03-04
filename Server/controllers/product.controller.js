const productSchema = require("../database/models/productSchema");
const APIError = require("../utils/errors");
const Response = require("../utils/response");
const server = require("../index")
const uploadProduct = async (req, res) => {
  let data = JSON.parse(JSON.stringify(req.body));
  if(req.file && req.file.originalname) data.image = req.file.originalname;
  const saveProduct = new productSchema(data);
  await saveProduct.save()
  .then(resp=>{
    return new Response(resp,"Product Created").created(res)
  }).catch(err=>{
    throw new APIError("Something went wrong!",402)
  })
};
module.exports = uploadProduct;
