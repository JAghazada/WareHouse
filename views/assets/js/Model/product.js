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
        this.loadingInterval = null;
        this.inputModal = this.getElement(".product-input-modal");
        this.exportModal = this.getElement(".product-export-modal");
        this.prodOpsContainer = this.getElement(".prod-name-container");
        this.tbody = this.getElement("tbody");
        this.spanp1 = this.getElement("span.p1");
        this.spanp2 = this.getElement("span.p2");
        this.modalCloseButton = this.getAllElement(".modal-close")

    }
    bindAddProduct() {
        this.inputModal.style.display = "flex"
    }
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
            const productID = e.target.parentNode.getAttribute("data-wrapper-id");
            this.inputModal.style.display = "flex";
            this.showLoading()
            const productInfo = await handler(productID)
            console.log(productInfo)
            this.hideLoading()

        });

        //* open product export modal
        this.spanp2.addEventListener("click", (e) => {
            const productID = e.target.parentNode.getAttribute("data-wrapper-id");
            this.exportModal.style.display = "flex"

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
