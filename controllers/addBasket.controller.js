const productSchema = require("../database/models/productSchema");
const addBasketController = async (req, res) => {
  const { obj_id, productCount } = req.body;
  const product = await productSchema.findOne({ _id: obj_id });
  const userID = req.session.userID;
  if (userID === undefined || userID === null)
    res.json({
      success: false,
      message: "Please Signin",
    });
  if (product !== undefined) {
    let detailedProductData = {...product._doc};
    detailedProductData["productCount"] = productCount
    let basket = req.session.basket || {};
    let userBasket = basket[userID] || [];
    userBasket.push(detailedProductData);
    basket[userID] = userBasket;
    req.session.basket = basket;
    res.json({ basket ,status: "success" });
  } else res.json({ status: "failed" });
};
module.exports = addBasketController;
