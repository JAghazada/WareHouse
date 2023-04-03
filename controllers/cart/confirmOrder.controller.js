const Bill = require("../../utils/bill");

const confirmOrderController = (req,res) =>{
    
    const user = req.session.user;
    const userID = req.session.userID;
    const basket = req.session.basket || {};
    const userBasket =  basket[userID] || [];

    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    
    const formattedDate = `${day < 10 ? '0' + day : day}.${month < 10 ? '0' + month : month}.${year}`;
    
    return new Bill(userBasket,user,formattedDate).createBill(res)
};

module.exports = confirmOrderController; 
