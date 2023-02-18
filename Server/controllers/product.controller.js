const uploadProduct = async (req, res) => {
  console.log("credentials : ", req.body)
  res.json(req.body)
};
module.exports = uploadProduct