const APIError = require("../utils/errors")
const Response = require("../utils/response")

const uploadProduct = async (req, res) => {
  res.json(req.body)
  
};
module.exports = uploadProduct