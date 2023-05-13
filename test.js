class Model{
    async getProduct (id) {
        const response = await fetch("http://localhost:3000/productInfo", {
            method: "POST",
            body: JSON.stringify({ obj_id: id }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        const result = await response.json();
        return result
    }
    
}
class View {
    constructor(){
        this.DIV = document.querySelector("div");
        this.loadingInterval = null;
    }
    bindGetProduct(handler){
        this.DIV.addEventListener("click", async () => {
            this.showLoading();

            const productInfo = await handler("645169136fafea63da381a56");
            console.log(productInfo);

            this.hideLoading();
        });
    }

    showLoading() {
        this.loadingInterval = setInterval(() => {
            console.log("Loading...");
        }, 1000);
    }

    hideLoading() {
        clearInterval(this.loadingInterval);
        console.log("Loading complete.");
    }
}



class Controller {
    constructor(model,view){
        this.model = model
        this.view = view
        this.view.bindGetProduct(this.handleGetProduct)
    }
    handleGetProduct = id =>{
        return   this.model.getProduct(id)
      }
}

const app = new Controller(new Model(),new View())

