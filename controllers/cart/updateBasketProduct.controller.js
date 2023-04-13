const updateBasketProductController = (req,res)=>{
    const {updatedCount,id} = req.body;
    const userID = req.session.userID;

    let basket = req.session.basket || {};
    let userBasket = basket[userID] || [];
    if(userBasket.length === 0 ){
        return res.json({
            success:false,
            message:"Səbətdə belə bir məhsul yoxdur!"
        })
    };
    userBasket.map(basketProduct=>{
        if(basketProduct._id===id){
            return basketProduct.productCount = updatedCount
        }
    });
    res.json(userBasket)


}
module.exports = updateBasketProductController