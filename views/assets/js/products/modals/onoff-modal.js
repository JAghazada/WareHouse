const closeModalButton = document.querySelector(".closeModal");
const insertModal = document.querySelector(".insert-modal")
const insertModalNavLink = document.querySelector(".insert-product-link");
const insertButton = document.querySelector(".add-product-btn")
insertButton.addEventListener("click",()=>{
    return insertModal.style.display="flex"
})
insertModalNavLink.addEventListener("click",()=>{
    return insertModal.style.display="flex"
})
closeModalButton.addEventListener("click",()=>{
    return insertModal.style.display="none"
})
