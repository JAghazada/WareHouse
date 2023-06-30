const { saveToRedis, getFromRedis, getTotalRedisData } = require("../helpers/redis-cache");
const jwt = require("jsonwebtoken");
const createProduct = async (req, res) => {
  let data = JSON.parse(JSON.stringify(req.body));
  if (req.file && req.file.originalname) data.image = req.file.originalname;
  const token = req.cookies.auth;
  const userID = jwt.decode(token).userID;
  data.QRcode = JSON.parse(data.QRcode)
  await saveToRedis("create",userID,data)
  const totalOrdersLength =await getTotalRedisData(userID)
    res.status(201).json({
    success:true,
    message:"data saved",
    orders:totalOrdersLength,
    userID:jwt.decode(token).userID
  })

};
module.exports = createProduct;
