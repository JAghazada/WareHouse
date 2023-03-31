const clearBasketController = (req,res)=>{
    const userID=req.session.userID;
    let basket = req.session.basket || {};
    let userBasket = basket[userID] || [];
    userBasket = [];
    basket[userID] = userBasket;
    req.session.basket = basket;
    res.json(userBasket)


}
module.exports = clearBasketController