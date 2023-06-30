class Invoice {
    constructor(id, date, operation, quantity, totalprice) {
        this.id = id;
        this.date = date;
        this.operation = operation;
        this.quantity = quantity;
        this.totalprice = totalprice
    }
    createBill () {
        switch (this.operation) {
            case "add":
                
                break;
            case "create":

                break;
            case "export":

                break;
        }
    }
    joinBills(){

    }
}