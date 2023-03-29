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
  if (product) {
    let productDataWithCount = {...product._doc};
    productDataWithCount["productCount"] =parseInt(productCount)
    let basket = req.session.basket || {};
    let userBasket = basket[userID] || [];
    let existingProductName = userBasket.findIndex(product=>product._id.toString()=== obj_id.toString());
    console.log(existingProductName)
    if(existingProductName !== -1){
      userBasket[existingProductName].productCount += parseFloat(productCount)
    }else{
      userBasket.push(productDataWithCount);
    }
    basket[userID] = userBasket;
    req.session.basket = basket;
    res.json({ basket ,status: "success" });
  } else res.json({ status: "failed" });
};
module.exports = addBasketController;
