const createProductLink = document.querySelector(".create-product-link");
const createModal = document.querySelector(".custommodal")
const closeModalButton = document.querySelector(".closeModal")
const openCreateProductModal = ()=>{
       createModal.style.display = "flex"
}
createProductLink.addEventListener("click",openCreateProductModal)

const closeAddProductModal = ()=>{
    createModal.style.display = "none"
}
closeModalButton.addEventListener("click",closeAddProductModal)