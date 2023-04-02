const showBasketController = (req,res)=>{
    const userID = req.session.userID;
    const basket = req.session.basket;
    let userBasket = basket[userID];
    if(userBasket.length===0){
        return res.redirect("/products")
    }
    let totalBasketPrice = 0
    userBasket.map(product=>totalBasketPrice+= parseFloat(product.SellingPrice)*parseFloat(product.productCount));
    totalBasketPrice.toFixed(2);
    userBasket["totalBasketPrice"] = totalBasketPrice;
    
    return res.render("basket",{basket:userBasket});

}
module.exports = showBasketController