const productSchema = require("../database/models/productSchema");
const APIError = require("../utils/errors");
const Response = require("../utils/response");
const uploadProduct = async (req, res) => {
  // console.log(req.body)
  let data = JSON.parse(JSON.stringify(req.body));
  const saveProduct = new productSchema(data);
  await saveProduct.save()
  .then(resp=>{
    return new Response(resp,"Product Created").created(res)
    // console.log(resp)
  }).catch(err=>{
    throw new APIError("Something went wrong!",402)
  })
  // res.json(data);
};
module.exports = uploadProduct;
