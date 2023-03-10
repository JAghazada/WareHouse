const getProductModal = document.querySelector(".open-gp-modal");
getProductModal.addEventListener("click",()=>{
  listUsers()
  .then(res=>res.json())
  .then(data=>listToTable(data,document.querySelector("tbody.search-table")))
  exportmodal.style.display="flex"
})