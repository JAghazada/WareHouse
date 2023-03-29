const deleteFromBasket = (req,res)=>{
    const {id} = req.body;
    const userID = req.session.userID;
    let  basket = req.session.basket
    let  userBasket = basket[userID];
    let updatedUserBasket = userBasket.filter(basketProduct=>basketProduct._id !== id);
    basket[userID] = updatedUserBasket;
    req.session.basket = basket;

    res.json({data:{
        basket:basket[userBasket]
    }})
    
}
module.exports = deleteFromBasket