const getBasketProducts=(req,res)=>{
   try {
    const userID = req.session.userID;
    const userBasket  =req.session.basket[userID] || [];
    res.json(userBasket)
   } catch (error) {
    res.json({message:"error occured"})
   }

};
module.exports = getBasketProducts