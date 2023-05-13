const socket = io();

class ProductSocketOperation {
    constructor(){
        this.id =id;
    }
    
    static productInfo(id) {
        return socket.emit("get-product-info",id);
        
    }
    static searchProduct(){

    }
}


