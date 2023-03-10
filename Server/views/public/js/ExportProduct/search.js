const searchInput = document.querySelector(".search-product");
const selectBox = document.querySelector(".select-type");
let selectVal = "ProductName";
let inpVal = "";
selectBox.addEventListener("change", (e) => {
  selectVal = e.target.value;
  listUsers(inpVal,selectVal)
  .then(res=>res.json())
  .then(data=>listToTable(data,document.querySelector("tbody.search-table")))

});
searchInput.addEventListener("input", (e) => {
  inpVal = e.target.value;
  listUsers(inpVal,selectVal)
  .then(res=>res.json())
  .then(data=>listToTable(data,document.querySelector("tbody.search-table")))
});


