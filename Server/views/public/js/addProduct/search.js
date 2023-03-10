const searchAddProduct=document.querySelector(".pre-search-product")
const selectapm=document.querySelector(".selectapm");
selectapm.addEventListener("change", (e) => {
    selectVal = e.target.value;
    listUsers(inpVal,selectVal)
    .then(res=>res.json())
    .then(data=>listToTable(data,document.querySelector("tbody.search-table-ap")))
  
  });
searchAddProduct.addEventListener("input", (e) => {
    inpVal = e.target.value;
    listUsers(inpVal,selectVal)
    .then(res=>res.json())
    .then(data=>listToTable(data,document.querySelector("tbody.search-table-ap")))
  });
  
