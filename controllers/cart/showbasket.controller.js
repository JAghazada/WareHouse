const showBasketController = (req,res)=>{
    const userID = req.session.userID;
    const basket = req.session.basket;
    const userBasket = basket[userID];
    res.render("basket",{basket:userBasket});

}
module.exports = showBasketController