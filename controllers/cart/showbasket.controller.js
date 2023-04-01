const showBasketController = (req,res)=>{
    const userID = req.session.userID;
    const basket = req.session.basket;
    const userBasket = basket[userID];
    console.log(userBasket)
    res.render("basket",{basket:userBasket});

}
module.exports = showBasketController