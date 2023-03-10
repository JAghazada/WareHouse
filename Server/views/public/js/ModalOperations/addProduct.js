const addProductLink = document.querySelector(".open-ap-modal");
// const modal = document.querySelector(".custommodal");
const modal = document.querySelector(".addproductm");
const closeModalButton = document.querySelector(".closeModal");
const tbody =document.querySelector("tbody.search-table-ap")

const openAddProductModal = ()=>{
    modal.style.display = "flex"
}
const closeAddProductModal = ()=>{
    modal.style.display = "none"
}
addProductLink.addEventListener("click",()=>{
    openAddProductModal()
    listUsers()
  .then(res=>res.json())
  .then(data=>listToTable(data,tbody))
})
closeModalButton.addEventListener("click",closeAddProductModal)