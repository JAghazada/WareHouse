const addProductLink = document.querySelector(".open-ap-modal");
// const modal = document.querySelector(".custommodal");
const modal = document.querySelector(".addproductm");
const tbody =document.querySelector("tbody.search-table-ap")

const openAddProductModal = ()=>{
    modal.style.display = "flex"
}

addProductLink.addEventListener("click",()=>{
    openAddProductModal()
    listUsers()
  .then(res=>res.json())
  .then(data=>listToTable(data,tbody))
})
