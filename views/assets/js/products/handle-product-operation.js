const productInputModal = document.querySelector(".product-input-modal");
const productExportModal = document.querySelector(".product-export-modal");
function handleProductİnput(id){
    productInputModal.style.display="flex"
    ProductSocketOperation.productInfo(id)
    // !socket

}
function handleProductExport(id){
    
    productExportModal.style.display="flex"
}