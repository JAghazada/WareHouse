const updateBasketProductController = (req,res)=>{
    console.log(req.body);
    const {updatedCount,id} = req.body;
    console.log(updatedCount,id);
    const userID = req.session.userID;

    let basket = req.session.basket || {};
    let userBasket = req.session.basket[userID] || [];
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