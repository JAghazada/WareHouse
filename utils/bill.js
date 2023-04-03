const withDrawBill = require("../database/models/withDrawBill");

class Bill {
   constructor(basket,user,date){
       this.user = user;
       this.date = date;
       this.basket = basket;
    }
    async createBill(res){
        const operation = "withdraw"
        const saveBill = await new withDrawBill({
            operation,
            basket :this.basket,
            date:this.date,
            user:this.user
        })
        await saveBill.save();
        res.json({
            "userBill":saveBill
        })
    }
    exportBill(){
   }
}
module.exports = Bill