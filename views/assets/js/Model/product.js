/**
 * @class ProductModel
 * 
 * 
 */

class ProductModel {
    constructor() {
        this.backendURI = "http://localhost:3000";
        this.alternativeBarcodeList = [];

    }
    async addBasket(productInfo) {
        const product = productInfo[0];

        const data = {
            id: product._id,
            exportCount: parseInt(product.count)
        }
        this.loadingStateChanged(true)
        const response = await ((await fetch("/exportProduct", {
            method: "POST",
            body: JSON.stringify(data),
            headers: { "Content-Type": "application/json" }
        })).json());
        if (response.success) {
            this.displayNavbar(".orders-link>span", response.orders)
            this.loadingStateChanged(false)

        }
    }

    socket() {
        const socket = io();
        this.socketRequestGetAllProduct = () => {
            socket.emit("request:get-all-product");
            socket.on("response:get-all-product", (products) => {
                this.productListChanged(products)
            })
        }
        this.searchProduct = (search_value) => {
            socket.emit("getProducts", search_value)

        }
        socket.on("products", products => {
            this.productListChanged(products)
        })


    }
    async deleteProduct(id, code = 13) {
        fetch("/deleteProduct", {
            method: "DELETE",
            body: JSON.stringify({ id }),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(res => this.socketRequestGetAllProduct())
            .catch(err => console.log(err))

    }
    async addProduct(id, count) {
        const data = { id, count: count, codes: this.alternativeBarcodeList };
        this.loadingStateChanged(true);
        const response = await (await fetch("/addProduct", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        })).json();
        this.loadingStateChanged(false);
        this.displayNavbar(".orders-link>span", response?.totalOrders);
        //* drain the alternative barcode list after data sent
        this.clearCodeList();



    }
    getErrorListFromView = errorCallback => {
        this.errorViewHandler = errorCallback
    }
    getNavbarHandler = callback => {
        this.displayNavbar = callback;
    }
    createProduct(productInfo, errorCallback) {
        let { ProductImgLink } = productInfo;

        if (ProductImgLink !== "/null.png") {
            const seperateLink = ProductImgLink.split("_.");
            const imgName = seperateLink[0];
            const imgExtension = seperateLink[1];
            const qrcode = this.alternativeBarcodeList[0];
            ProductImgLink = imgName + "_" + qrcode + "." + imgExtension;

        }
        const formData = new FormData();
        formData.append("NumberOfProducts", productInfo.NumberOfProducts);
        formData.append("Unit1", productInfo.Unit1);
        formData.append("Unit2", productInfo.Unit2);
        formData.append("CompanyName", productInfo.CompanyName);
        formData.append("PurchasePrice", productInfo.PurchasePrice);
        formData.append("SellingPrice", productInfo.SellingPrice);
        formData.append("ProductName", productInfo.ProductName);
        formData.append("UnitOfMeasurment", productInfo.UnitOfMeasurment);
        formData.append("SecondUnitOfMeasurment", productInfo.SecondUnitOfMeasurment);
        formData.append("QRcode", JSON.stringify(this.alternativeBarcodeList))
        formData.append("MainCode", this.alternativeBarcodeList[0])
        formData.append("Link", ProductImgLink)
        formData.append("files", productInfo.files);

        // ! fetch request
        fetch("/createProduct", {
            method: "POST",
            body: formData,
        })
            .then(res => res.json()).then(res => {
                if (res.error) {
                    const errorList = res.error.split(",");
                    this.errorViewHandler(errorList)
                }
                if (res.success) {
                    this.clearCodeList();
                    this.clearInputs();
                    this.displayNavbar(".orders-link>span", res.orders);
                }

            }
            )
            .catch(err => console.log(err))



    }
    // * get product info from backend 
    async getProduct(id) {
        const response = await fetch(this.backendURI + "/productInfo", {
            method: "POST",
            body: JSON.stringify({ obj_id: id }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        const result = await response.json();
        console.log(result);
        return result
    }
    async ChangeMainCode(id, value) {
        const response = await fetch("/changeBarcode", {
            method: "PUT",
            body: JSON.stringify({ id, maincode: value }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        const result = await response.json();
        this.socketRequestGetAllProduct();
        return result
    }
    // * display alternative barcode list 
    bindAlternativeBarcodeChanged(callback) {
        this.alternativeBarcodeListChanged = callback
    }
    // * when addProduct run after response product changed
    bindInputProductChanged(callback) {
        this.InputProductChanged = callback
    }
    bindLoadingStateChanged(callback) {
        return this.loadingStateChanged = callback
    }
    bindProductListChanged(callback) {
        return this.productListChanged = callback
    }
    bindExportProductChanged(callback) {
        return this.ExportProductChanged = callback
    }
    // ? update barcodelist
    // * add barcode
    addAlternativeBarcode(barcode) {
        if (this.alternativeBarcodeList.indexOf(barcode) === -1) {
            this.alternativeBarcodeList.push(barcode);
            return this.alternativeBarcodeListChanged(this.alternativeBarcodeList);
        }
    }
    // * delete barcode
    deleteAlternativeBarcode(barcode) {
        this.alternativeBarcodeList = this.alternativeBarcodeList.filter(code => code !== barcode)
        return this.alternativeBarcodeListChanged(this.alternativeBarcodeList)
    }
    // * clear code list
    clearCodeList() {
        this.alternativeBarcodeList = [];
        return this.alternativeBarcodeListChanged(this.alternativeBarcodeList);
    }
    clearInputsHandler(callback) {
        this.clearInputs = callback
    }


}
class ProductView {
    constructor() {

        this.regex = /^\d+$/;
        this.translateJson = {
            number: "Əd",
            kg: "Kg",
            cm: "Sm",
            dm: "Dm",
            box: "Qutu",
            meter: "Metr",
            block: "Blok",
            wholesale: "Top",
            bag: "Kisə",
            set: "Dəst",
            packet: "Paket",
        };
        this.u1Type = "number";
        this.u2Type = "number"
        this.activeBarcodeDisplay = null;
        this.activeBarcodeInput = null;
        this.tabelSearchInput = this.getElement("input#table-search-input");


        //* create product modal's element
        this.openCreateProductModal = this.getElement(".open-create-product-btn");
        this.createProductModal = this.getElement(".insert-modal");
        this.closeCreateProductModal = this.getElement(".closeModal");
        this.createModalProductName = this.getElement("#productName");
        this.createModalProductCompany = this.getElement("#productCompany")
        this.createModalProductCount = this.getElement("#productCount")
        this.createModalProductUnitOfMeasurment = this.getElement("#UnitOfMeasurment")
        this.createModalProductUnitOfMeasurment2 = this.getElement("#UnitOfMeasurment2")
        this.createModalProductunitv1 = this.getElement(".unit-v1");
        this.createModalProductunitv2 = this.getElement(".unit-v2");
        this.createModalProductunit1inp = this.getElement(".unit-1-inp");
        this.createModalProductunit2inp = this.getElement(".unit-2-inp");
        this.createModalProductPurchasePrice = this.getElement("#Price");
        this.createModalProductSellingPrice = this.getElement("#SellingPrice");
        this.createModalProductQRcode = this.getElement("#QRcode");
        this.createModalProductIMG = this.getElement("#ChooseImage");
        this.insertInput = [...this.getAllElement(".insert-input")];
        this.createModalImgArea = this.getElement("#preview-img");
        this.deleteCreateModalImgButton = this.getElement(".delete-img");
        this.createProductButton = this.getElement(".create-product-btn");

        this.createModalProductunitv1.value = "number";
        this.createModalProductunitv2.value = "number";
        // !run image upload listener
        this._createUploadImageListener()
        // !run input  listeners
        this._createProductInputsListener()
        // ! run selectbox listeners
        this._createProductSelectBoxsListener();
        // ! run create product button listener

        // * product-input-modal general elements
        this.productInputProductID = null
        this.loader = null;
        this.inputModal = this.getElement(".product-input-modal");
        this.exportModal = this.getElement(".product-export-modal");
        this.prodOpsContainer = [...this.getAllElement(".prod-name-container")];
        this.tbody = this.getElement("tbody");
        this.spanp1 = [...this.getAllElement("span.p1")];
        this.spanp2 = [...this.getAllElement("span.p2")];
        this.modalCloseButton = this.getAllElement(".modal-close");
        this.productCountInput = this.getElement("#product-input-count");
        this.productInputSubmitButton = this.getElement(".add-product-btn");

        //* product-input-elements
        this.productInputTitle = this.getElement(".product-input-title");
        this.productInputPrice = this.getElement(".product-input-price")
        this.productInputImg = this.getElement(".product-input-img");
        this.alternativeBarcodeInput = this.getElement(".alternative-barcode-input");
        this.alternativeBarcodeListWrapper = this.getElement(".codes-wrapper")
        this.productInputProductCount = this.getElement(".product-input-product_count");
        //* product-export-elements
        this.productExportTitle = this.getElement(".product-export-title");
        this.productExportPrice = this.getElement(".product-export-price");
        this.productExportImg = this.getElement(".product-export-img");
        this.productExportCountInput = this.getElement("#product-export-count-input");
        this.productExportCountWrapper = this.getElement(".product-export-product_count");
        this.productExportButton = this.getElement(".export-product-btn");
        // 
        this.mainCodeSelector = this.getElement("#change-main-code");
        this.editModal = this.getElement(".edit-modal");
        this.confirmCodeButton = this.getElement(".confirm-main-code");


    }
    _searchInputListener(handler) {
        this.tabelSearchInput.addEventListener("input", e => {
            const search_value = e.target.value.trim();
            handler(search_value)
        })
    }
    _errorCallback(errorList) {
        this.insertInput.forEach(input => input.style.border = "1px solid #ced4da")


        try {

            errorList.forEach(error => {
                let errorType = error.split("*")[0].trim();
                if (errorType === '100') {
                    this.createModalProductName.style.border = "2px solid #ed2939"
                }
                if (errorType === '110') {
                    this.createModalProductCount.style.border = "2px solid #ed2939"
                }
                if (errorType === '140') {
                    this.createModalProductPurchasePrice.style.border = "2px solid #ed2939"
                }
                if (errorType === '150') {
                    this.createModalProductSellingPrice.style.border = "2px solid #ed2939"

                } if (errorType === '160') {
                    this.createModalProductQRcode.style.border = "2px solid #ed2939"

                }
            })
        } catch (error) {

        }
    }
    _deleteProductButtonListener(deleteProductCallback) {
        this.deleteProductButton = [...this.getAllElement(".delete-product")];
        this.deleteProductButton.map(deleteButton => {
            deleteButton.addEventListener("click", (e) => {
                const deleteRequest = confirm("Silmek istediyinize eminsiniz ?");
                if (deleteRequest) {
                    const id = e.target.parentNode.parentNode.getAttribute("data-element-id")
                    return deleteProductCallback(id, 13)
                }

            })
        })

    }
    _editProductButtonListener(getProductInfo, changeMainCode) {
        let productId;
        this.editProductButton = [...this.getAllElement(".edit-product")];
        this.editProductButton.map(editButton => {
            editButton.addEventListener("click", async (e) => {
                this.loader = this.getElement(".lds-dual-ring-2")
                this.editModal.style.display = "flex";
                this.showLoading();
                this.mainCodeSelector.innerHTML = ``
                const parentElement = e.target.parentNode.parentNode;
                productId = parentElement.getAttribute("data-element-id");
                const productData = (await getProductInfo(productId))[0];
                const QRcode = (productData.QRcode);
                const maincode = productData.MainCode;

                QRcode.forEach((code, index) => {
                    const optionElement = this.createElement("option");
                    optionElement.text = code;
                    optionElement.value = code;
                    if (code == maincode) {
                        optionElement.selected = true;
                    }
                    this.mainCodeSelector.add(optionElement)
                })
                this.hideLoading();


            })
        })
        this.confirmCodeButton.addEventListener("click", async () => {
            const response = await changeMainCode(productId, this.mainCodeSelector.value);
            console.log(response);
        })

    }
    clearInputs = () => {
        this.insertInput.forEach(input => {
            input.value = "";
            this.createModalImgArea.innerHTML = "";
            input.style.border = "1px solid #ced4da"
        });
        [...this.getAllElement(".val")].forEach(element => element.textContent = "");
        this._createUploadImageListener();
        this.createModalProductunit1inp.value = "1"
        this.createModalProductunit2inp.value = "1"


    }
    _createProductButtonListener(handler) {

        this.createProductButton.addEventListener("click", e => {
            e.preventDefault();
            let imgLink;
            try {
                const extList = this.createModalProductIMG.files[0].name.split(".");
                const extension = extList[extList.length - 1];
                const link = this.createModalProductName.value + "_." + extension;
                imgLink = link
            } catch (error) {
                imgLink = "/null.png";
            }
            const data = {
                ProductName: this.createModalProductName.value,
                CompanyName: this.createModalProductCompany.value,
                NumberOfProducts: this.createModalProductCount.value,
                UnitOfMeasurment: this.createModalProductUnitOfMeasurment.value,
                SecondUnitOfMeasurment: this.createModalProductUnitOfMeasurment2.value,
                Unit1: parseFloat(this.createModalProductunit1inp.value),
                Unit2: parseFloat(this.createModalProductunit2inp.value),
                PurchasePrice: this.createModalProductPurchasePrice.value,
                SellingPrice: this.createModalProductSellingPrice.value,
                files: this.createModalProductIMG.files[0],
                ProductImgLink: imgLink,
            }
            handler(data);
        })
    }
    // * open createproduct modal
    _createProductListener(barcodeHandler, deleteBarcodeHandler) {
        this.openCreateProductModal.addEventListener("click", e => {
            this.activeBarcodeDisplay = this.getElement(".preview-qrcode");
            this.activeBarcodeInput = this.createModalProductQRcode;
            this.createProductModal.style.display = "flex";
            this.insertInput[0].focus();
            this._alternativeBarcodeListener(barcodeHandler);
            this._deleteBarcodeListener(deleteBarcodeHandler)


        })
    }
    // *upload image for create-modal
    _createUploadImageListener() {
        let reader;
        // ? listen delete button
        this.deleteCreateModalImgButton.addEventListener("click", e => {
            this.createModalImgArea.innerHTML = "";
            this.createModalProductIMG.value = "";
            reader = new FileReader();
            reader.abort();

        })
        const getImgArea = () => {
            return this.createModalImgArea
        }
        const getCreateElement = (selector) => this.createElement(selector)
        // ? listen image uploading;
        this.createModalProductIMG.addEventListener("change", function () {
            const MimeTypes = ["jpg", "jpeg", "gif", "png"];
            const image = this.files[0];
            try {
                const splitImage = image.name.split(".");
                const extension = splitImage[splitImage.length - 1];
                if (MimeTypes.indexOf(extension) !== -1) {
                    reader = new FileReader();
                    let imgArea = getImgArea();
                    imgArea.innerHTML = ``;
                    reader.onload = () => {
                        const imgUrl = reader.result;
                        const img = getCreateElement("img");
                        img.classList.add("image-properties");
                        img.src = imgUrl;
                        imgArea.appendChild(img);
                    };
                    reader.readAsDataURL(image)

                } else {
                    alert("jpg,jpeg,gif veya png formtainda sekil elave edin");
                }
            } catch (error) {
                console.log(error)
            }
        })
    }
    _createProductInputsListener() {
        // * input focuses
        this.insertInput.forEach((input, index) => {
            input.addEventListener("keydown", e => {
                if (e.key === "ArrowDown") {
                    if (this.insertInput[index + 1] === undefined) return this.insertInput[0].focus()
                    return this.insertInput[index + 1].focus()
                } else if (e.key === "ArrowUp") {
                    if (this.insertInput[index - 1] === undefined) return this.insertInput[this.insertInput.length - 1].focus()
                    return this.insertInput[index - 1].focus()
                } else if (e.key === "Enter" && [...e.target.classList][0] !== "custom-file-input") {
                    e.preventDefault();
                }
            })

        })
        // * fill previews
        this.insertInput.forEach(input => {
            input.addEventListener("input", e => {
                const className = [...e.target.classList][2].split("_")[1];

                if (className !== "qrcode") return this.getElement(".preview-" + className).textContent = e.target.value
            })
        })
        this.createModalProductunit1inp.addEventListener("input", e => {
            this.getElement(".preview-unit").textContent = e.target.value + " " + this.translateJson[this.u1Type]
        })
        this.createModalProductunit2inp.addEventListener("input", e => {
            this.getElement(".preview-unit-2").textContent = e.target.value + " " + this.translateJson[this.u2Type]

        })

    }
    // * listen createmodal selectboxs
    _createProductSelectBoxsListener() {
        this.createModalProductUnitOfMeasurment.addEventListener("change", e => {
            const unitValue = e.target.value;
            this.u1Type = unitValue
            this.createModalProductunitv1.textContent = this.translateJson[unitValue];
            this.getElement(".preview-unit").textContent = this.createModalProductunit1inp.value + " " + this.translateJson[unitValue]

        })
        this.createModalProductUnitOfMeasurment2.addEventListener("change", e => {
            const unitValue = e.target.value;
            this.u2Type = unitValue
            this.createModalProductunitv2.textContent = this.translateJson[unitValue]
            this.getElement(".preview-unit-2").textContent = this.createModalProductunit2inp.value + " " + this.translateJson[unitValue]
        })
    }


    // * display products
    displayProducts(products, cb1, cb2, cb3, cb4, cb5, handleChangeCode, handleDeleteProduct) {
        this.tbody.innerHTML = ``;
        products.forEach(product => {
            let tr = this.createElement("tr");
            tr.setAttribute("data-element-id", product._id)
            tr.innerHTML = ` 
            <td>#${product.MainCode}</td>
             <td   class="prod-name-container"> 
              <div class="container-id" data-element-id= "${product._id}">

              </div>
              <div class="product-operation-wrapper" data-wrapper-id="${product._id}">
                <span class="p1" >Mədaxil</span>
                <span class="p2">Məxaric</span>
                <div class="square-l">
                </div>
              </div>
              <img src="/uploads/${product.Link}" alt="product-img">
               ${product.ProductName}
            </td>
            <td>
               ${product.CompanyName}
            </td>
            <td>
               ${product.Date}
            </td>
            <td>
               ${product.PurchasePrice}
            </td>
            <td>
               ${product.SellingPrice}
            </td>
            <td>
               ${product.UnitOfMeasurment}
            </td>
            <td>
                ${product.QRcode.map(code => {
                return `<span>#${code}</span>`
            })
                }
            </td>
            <td class="table-operations">
              <img class="point edit-product" src="/icons/edit-icon.svg" alt="edit">
              <img class="point delete-product" src="/icons/delete-icon.svg" alt="delete">
            </td>`
            this.tbody.append(tr);
        });
        this.spanp1 = [...this.getAllElement("span.p1")];
        this.spanp2 = [...this.getAllElement("span.p2")];
        this.prodOpsContainer = [...this.getAllElement(".prod-name-container")];
        this.bindProductOps();
        this._editProductButtonListener(cb1, handleChangeCode);
        this.openProductOpModal(cb1, cb2, cb3, cb4, cb5);

        this._deleteProductButtonListener(handleDeleteProduct)



    }
    _productInputCountListener(handler) {
        const callHandler = () => {
            if (this.regex.test(this.productCountInput.value)) {
                handler(this.productInputProductID, this.productCountInput.value)
                this.productCountInput.value = "";
                return this.alternativeBarcodeInput.value = "";
            };
        }
        this.productCountInput.addEventListener("keydown", (e) => {
            if (e.key === "ArrowUp") {
                this.alternativeBarcodeInput.focus();
            }
            if (e.key === "Enter") {
                callHandler()
            }
        })
        this.productInputSubmitButton.addEventListener("click", () => {
            callHandler()
        })
    }

    // ! barcode operations
    // * add_alternative_barcode listener for product-input-modal
    _alternativeBarcodeListener(handler) {
        this.activeBarcodeInput.addEventListener("keydown", (e) => {
            if (e.key === "Enter" && this.regex.test(e.target.value.trim())) {
                return handler(e.target.value.trim())
            }
            //  else if (e.key === "ArrowDown") {
            //     return this.productCountInput.focus();
            // }
        });
    };
    // * delete_alternative_barcode listener for product-input-modal
    _deleteBarcodeListener(callback) {
        this.activeBarcodeDisplay.addEventListener("click", e => {
            if (e.target.className === "alter-code") {
                callback(e.target.id)
            }
        })
    }
    // * display alternative barcodes
    displayAlternativeBarcodes(barcodes) {
        this.activeBarcodeInput.value = ""
        this.activeBarcodeDisplay.innerHTML = ``
        barcodes.map(barcode => {
            let DIV = this.createElement("div", "alter-code");
            DIV.id = barcode;
            DIV.textContent = barcode
            this.activeBarcodeDisplay.append(DIV);
        });
    };
    // * get  html element
    getElement(selector) {
        const element = document.querySelector(`${selector}`)
        return element
    }
    // * getall html element
    getAllElement(selector) {
        const element = document.querySelectorAll(`${selector}`)
        return element
    }
    // * create html element
    createElement(tag, className) {
        const element = document.createElement(tag);
        if (className) element.classList.add(className)
        return element
    }
    // * open product opreation modal helper wrapper (medaxil && mexaric text wrapper)
    bindProductOps() {
        this.prodOpsContainer.map(opsContainer => {
            opsContainer.addEventListener("click", (e) => {
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
        })
    }
    // * open product operations modal (medaxil && mexaric)
    openProductOpModal(getProductHandler, barcodeListenerCallback, deleteCallback, addProductCallback, basketCallback) {
        //* open product input modal 
        this.spanp1.map(span => {
            span.addEventListener("click", async (e) => {
                this.loader = this.getElement(".lds-dual-ring");
                this.productInputProductID = e.target.parentNode.getAttribute("data-wrapper-id");

                this.inputModal.style.display = "flex";
                this.showLoading();
                const productInfo = await getProductHandler(this.productInputProductID);
                this.productInputPrice.textContent = productInfo[0].SellingPrice + "azn";
                this.productInputTitle.textContent = productInfo[0].ProductName;
                this.productInputProductCount.textContent = "Sayı: " + productInfo[0].NumberOfProducts;
                this.productInputImg.src = "/uploads/" + productInfo[0].Link;
                this.hideLoading();
                this.alternativeBarcodeInput.focus();
                this.activeBarcodeInput = this.alternativeBarcodeInput
                this.activeBarcodeDisplay = this.alternativeBarcodeListWrapper
                this._alternativeBarcodeListener(barcodeListenerCallback);
                this._deleteBarcodeListener(deleteCallback);
                this._productInputCountListener(addProductCallback);



            })
        })

        //* open product export modal
        this.spanp2.map(span => {
            span.addEventListener("click", async (e) => {
                this.loader = this.getElement(".lds-dual-ring-1");
                this.productInputProductID = e.target.parentNode.getAttribute("data-wrapper-id");
                this.exportModal.style.display = "flex";
                this.showLoading();
                let productInfo = await getProductHandler(this.productInputProductID);
                this.productExportPrice.textContent = productInfo[0].SellingPrice + "azn";
                this.productExportTitle.textContent = productInfo[0].ProductName;
                this.productExportCountWrapper.textContent = "Sayı: " + productInfo[0].NumberOfProducts
                this.productExportImg.src = "/uploads/" + productInfo[0].Link;
                this.hideLoading();
                this.productExportCountInput.focus();
                this.productExportButton.addEventListener("click", (e) => {
                    e.preventDefault()
                    if (!this.regex.test(this.productExportCountInput.value.trim())) return false;
                    productInfo[0].count = this.productExportCountInput.value.trim();
                    basketCallback(productInfo)
                    this.productExportCountInput.value = ""

                })
                this.productExportCountInput.addEventListener("keydown", e => {
                    if (e.key === "Enter") {
                        if (!this.regex.test(this.productExportCountInput.value.trim())) return false;
                        productInfo[0].count = this.productExportCountInput.value.trim();
                        basketCallback(productInfo)
                        this.productExportCountInput.value = ""

                    }
                })
            });
        })


    }
    productInputChanged(new_product) {
        this.productInputPrice.textContent = new_product.product.SellingPrice + "azn";
        this.productInputTitle.textContent = new_product.product.ProductName;
        this.productInputProductCount.textContent = "Sayı: " + new_product.product.NumberOfProducts;
    }
    productExportChanged(new_product) {
        console.log(new_product)
        this.productExportPrice.textContent = new_product.product.SellingPrice + "azn";
        this.productExportTitle.textContent = new_product.product.ProductName;
        this.productExportCountWrapper.textContent = "Sayı: " + new_product.product.NumberOfProducts;
    }
    // * loading displays
    showLoading() {
        this.loader.style.display = "flex"
    }
    hideLoading() {
        this.loader.style.display = "none"
    }
    // * close modals
    closeButtonListener(clearQrcodes) {

        [...this.modalCloseButton].map(btn => {
            btn.addEventListener("click", (e) => {
                e.target.parentNode.parentNode.style.display = "none";
                return clearQrcodes();
            });
        });
        this.closeCreateProductModal.addEventListener("click", e => {
            this.createProductModal.style.display = "none";
            return clearQrcodes()
        });
    };


    displayNavbar(tag, value) {
        console.log(tag);
        console.log(value);
        this.getElement(tag).textContent = value
    }
};

class ProductController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.view._createProductButtonListener(this.handleCreateProduct);
        this.view._deleteProductButtonListener(this.handleDeleteProduct);
        this.view._editProductButtonListener(this.handleGetProduct, this.handleChangeCode);
        this.model.socket();
        this.view.bindProductOps();
        this.view._createProductListener(this.handleAddAlternativeBarocde, this.handleDeleteAlternativeBarcode)
        this.view.openProductOpModal(this.handleGetProduct, this.handleAddAlternativeBarocde, this.handleDeleteAlternativeBarcode, this.handleAddProduct, this.handleAddBasket);
        this.model.bindAlternativeBarcodeChanged(this.onBarcodeListChanged)
        this.model.bindInputProductChanged(this.onInputProductChanged)
        this.model.bindExportProductChanged(this.onExportProductChanged)
        this.model.bindLoadingStateChanged(this.onLoadingStateChanged)
        this.model.bindProductListChanged(this.onProductListChanged)
        this.view.closeButtonListener(this.handleClearCodeList);
        this.view._searchInputListener(this.handleSearchProduct);
        this.model.getNavbarHandler(this.bindNavbarChanged);
        this.model.getErrorListFromView(this.bindErrorHandler);
        this.model.clearInputsHandler(this.bindClearInputs)
    }
    bindClearInputs = () => {
        return this.view.clearInputs()
    }
    bindErrorHandler = errorList => {
        return this.view._errorCallback(errorList)
    }
    bindNavbarChanged = (tag, value) => {
        return this.view.displayNavbar(tag, value)
    }
    handleSearchProduct = search_value => {
        return this.model.searchProduct(search_value)
    }
    handleDeleteProduct = (id, code) => {
        this.model.deleteProduct(id, code);
    }
    handleChangeCode = (id, value) => {
        this.model.ChangeMainCode(id, value);
    }
    handleCreateProduct = productInfo => {
        return this.model.createProduct(productInfo)
    }
    handleAddBasket = productInfo => {
        return this.model.addBasket(productInfo)
    }
    handleAddAlternativeBarocde = barcode => {
        return this.model.addAlternativeBarcode(barcode)
    }
    handleGetProduct = id => {
        return this.model.getProduct(id);
    }
    onExportProductChanged = product => {
        return this.view.productExportChanged(product)
    }
    onBarcodeListChanged = barcodeList => {
        return this.view.displayAlternativeBarcodes(barcodeList)
    }
    onLoadingStateChanged = state => {
        if (state) return this.view.showLoading();
        else return this.view.hideLoading();
    }
    onInputProductChanged = product => {
        return this.view.productInputChanged(product)
    }
    onProductListChanged = products => {
        return this.view.displayProducts(products, this.handleGetProduct, this.handleAddAlternativeBarocde, this.handleDeleteAlternativeBarcode, this.handleAddProduct, this.handleAddBasket, this.handleChangeCode, this.handleDeleteProduct);
    }
    handleDeleteAlternativeBarcode = barcode => {
        return this.model.deleteAlternativeBarcode(barcode)
    }
    handleAddProduct = (id, productCount) => {
        return this.model.addProduct(id, productCount);
    }
    handleClearCodeList = () => {
        return this.model.clearCodeList();
    }
}
const app = new ProductController(new ProductModel(), new ProductView());
