const alternativeBarcodeInput = document.querySelector(".alternative-barcode-input");
const codesWrapper = document.querySelector(".codes-wrapper");
const closeProductInputButton = document.querySelector(".porduct-input-layout-close");
const productBarcodeHandler = ()=>{
    
    let barcodeList = [];
    function listCodes(){
        codesWrapper.innerHTML = ``
        barcodeList.forEach(code=>{
            const divElement = document.createElement("div");
            divElement.innerHTML = `<div onclick="codeDeleteHandler(${code})" class="text-center   d-flex  p-1 font-italic font-weight-bold">${code}</div>`
            codesWrapper.append(divElement);
        })
   
    }

    function addBarcode(code){
        barcodeList.push(code);
        return listCodes();
    };

    function getBarcode (){
        return barcodeList
    }

    function deleteCode (code){
        const barcodeListIndex = barcodeList.indexOf(`${code}`);
        barcodeList.splice(barcodeListIndex,1); //! delete code from array
        return listCodes()
    }
    return {addBarcode,getBarcode,deleteCode};

};
const barcodeHandler =productBarcodeHandler();
alternativeBarcodeInput.addEventListener("keydown",(e)=>{
    if(e.key === "Enter"){
        const regex = /^\d+$/;
        if(!regex.test(e.target.value.trim())){
            return false
        }
        barcodeHandler.addBarcode(e.target.value.trim())
        return alternativeBarcodeInput.value = "";
    }
})

const codeDeleteHandler =(code)=>barcodeHandler.deleteCode(code);

closeProductInputButton.addEventListener("click",()=>document.querySelector(".product-input-modal").style.display = "none")