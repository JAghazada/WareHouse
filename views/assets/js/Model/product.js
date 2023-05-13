/**
 * @class ProductModel
 * 
 * 
 */

class ProductModel {
    constructor() {
        this.backendURI = "http://localhost:3000";
    }
    
    addProduct() {

    }


    async getProduct(id) {
        const response = await fetch(this.backendURI + "/productInfo", {
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
class ProductView {

    constructor() {
        this.alternativeBarcodeList = []
        this.loader = null;
        this.inputModal = this.getElement(".product-input-modal");
        this.exportModal = this.getElement(".product-export-modal");
        this.prodOpsContainer = this.getElement(".prod-name-container");
        this.tbody = this.getElement("tbody");
        this.spanp1 = this.getElement("span.p1");
        this.spanp2 = this.getElement("span.p2");
        this.modalCloseButton = this.getAllElement(".modal-close");
        
        //* product-input-elements
        this.productInputTitle = this.getElement(".product-input-title");
        this.productInputPrice = this.getElement(".product-input-price")
        this.productInputImg = this.getElement(".product-input-img");
        this.alternativeBarcodeInput = this.getElement(".alternative-barcode-input");
        this.alternativeBarcodeListWrapper = this.getElement(".codes-wrapper")
        
        //* product-export-elements
        this.productExportTitle = this.getElement(".product-export-title");
        this.productExportPrice=this.getElement(".product-export-price");
        this.productExportImg=this.getElement(".product-export-img");
    }

    bindAddProduct() {
        this.inputModal.style.display = "flex"
    }
    _alternativeBarcodeListener(){

        this.alternativeBarcodeInput.addEventListener("keydown",(e)=>{
            const regex = /^\d+$/;

            if(e.key==="Enter" && regex.test(e.target.value.trim())) {
                this.alternativeBarcodeList.push(e.target.value);
                this.alternativeBarcodeListWrapper.innerHTML = ``
                this.displayAlternativeBarcodes()
                console.log(this.alternativeBarcodeList);
            }
        });
    };
    displayAlternativeBarcodes(){
        this.alternativeBarcodeList.map(barcode=>{
            const DIV  =  this.createElement("div","alter-code");
            DIV.textContent = barcode
            this.alternativeBarcodeListWrapper.append(DIV);
        });
    };
    getElement(selector) {
        const element = document.querySelector(`${selector}`)
        return element
    }

    getAllElement(selector) {
        const element = document.querySelectorAll(`${selector}`)
        return element
    }

    createElement(tag, className) {
        const element = document.createElement(tag);
        if (className) element.classList.add(className)
        return element
    }

    bindProductOps() {
        this.prodOpsContainer.addEventListener("click", (e) => {
            const prodContainerID = e.target.getAttribute('data-element-id');

            const productOperationWrapper = this.getElement(`.product-operation-wrapper[data-wrapper-id="${prodContainerID}"]`);

            const openedWrapper = this.getElement(".open-wrapper")

            //* if there are any  opened "product wrapper" close them
            if ([...productOperationWrapper.classList].indexOf("open-wrapper") === -1) {

                if (openedWrapper) {
                    openedWrapper.classList.remove("open-wrapper")
                };
                //* after closed, open new "product-wrapper"
                return productOperationWrapper.classList.add("open-wrapper")
            }
            //* if target element's wrapper already open close them
            return productOperationWrapper.classList.remove("open-wrapper")
        })
    }
  
    openProductOpModal(handler) {    
        //* open product input modal 
        this.spanp1.addEventListener("click",async (e) => {
            this.loader = this.getElement(".lds-dual-ring");
            const productID = e.target.parentNode.getAttribute("data-wrapper-id");
            this.inputModal.style.display = "flex";
            this.showLoading();
            const productInfo = await handler(productID);
            this.productInputPrice.textContent =productInfo[0].SellingPrice;
            this.productInputTitle.textContent = productInfo[0].ProductName;
            this.productInputImg.src = "/uploads/"+productInfo[0].Link;
            this.hideLoading();
            this._alternativeBarcodeListener();


        });

        //* open product export modal
        this.spanp2.addEventListener("click", async(e) => {
            this.loader = this.getElement(".lds-dual-ring-1");
            const productID = e.target.parentNode.getAttribute("data-wrapper-id");
            this.exportModal.style.display = "flex";
            this.showLoading();
            const productInfo = await handler(productID);
            this.productExportPrice.textContent =productInfo[0].SellingPrice;
            this.productExportTitle.textContent = productInfo[0].ProductName;
            this.productExportImg.src = "/uploads/"+productInfo[0].Link;
            this.hideLoading();

        });
        

    }
    showLoading() {
       this.loader.style.display = "flex"
    }

    hideLoading() {
        this.loader.style.display = "none"
    }
    closeButtonListener() {
        [...this.modalCloseButton].map(btn => {
            btn.addEventListener("click", (e) => {
                e.target.parentNode.parentNode.style.display = "none";
            });
        });
    };
};

class ProductController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.view.bindProductOps();
        this.view.openProductOpModal(this.handleGetProduct);
        this.view.closeButtonListener();
    }
    handleGetProduct = id => {
        return this.model.getProduct(id);
    }
}
const app = new ProductController(new ProductModel(), new ProductView());
