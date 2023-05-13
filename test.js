class ProductSocketOperation {
    constructor(){
        this.id =id;
    }
    
    static productInfo(id) {
        console.log(id);
        return id
    }
    static searchProduct(){

    }
}


console.log(ProductSocketOperation.productInfo(25))