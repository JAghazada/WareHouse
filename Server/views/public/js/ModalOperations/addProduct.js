const addProductLink = document.querySelector(".open-ap-modal");
const modal = document.querySelector(".custommodal");
const closeModalButton = document.querySelector(".closeModal")
const openAddProductModal = ()=>{
    modal.style.display = "flex"
}
const closeAddProductModal = ()=>{
    modal.style.display = "none"
}
addProductLink.addEventListener("click",openAddProductModal)
closeModalButton.addEventListener("click",closeAddProductModal)