class BillModel {
    redirectUser(billID,type){
        if(billID && type){
            return window.location.href =`/bill?id=${billID}&type=${type}`
        }
    }
}


class BillView {
    constructor (){
        this.InvoiceCards =[...this.getAllElement(".invoice-cart")];
    }


    _invoiceCartListener(redirectUser) {
        this.InvoiceCards.forEach(invoiceCard=>{
            invoiceCard.addEventListener("click",e=>{
                const billID = e.target.getAttribute("data-invoice-id");
                const billType = e.target.getAttribute("data-invoice-type");
                redirectUser(billID,billType)
            })
        })        
    }


    getElement(query){
         const element = document.querySelector(query);
         return element
    }
    getAllElement(query){
        const elements = document.querySelectorAll(query);
        return elements
   }
   
    createElement(tag,className){
        const element = document.createElement(tag);
        element.class = className;
        return element
    }
}

class BillController {
    constructor(view,model){
        this.model = model;
        this.view = view;
        this.view._invoiceCartListener(this.redirectUser)
    }
    redirectUser=(billID,type)=>{
        return this.model.redirectUser(billID,type)
    }
}


const BillMVC = new BillController(new BillView(),new BillModel())