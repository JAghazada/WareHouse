const searchInput = document.querySelector(".search-product");
const selectBox = document.querySelector(".select-type");
let selectVal = "ProductName";
let inpVal = "";
selectBox.addEventListener("change", (e) => {
  selectVal = e.target.value;
  listUsers();
});
searchInput.addEventListener("input", (e) => {
  inpVal = e.target.value;
  listUsers();
});


const listUsers = (name=inpVal,selectType=selectVal) => {
  const formData = {
    name: inpVal,
    selectVal:selectType,
  };
  fetch("http://localhost:5000/getProducts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((res) => res.json())
    .then((data) => {
      const tbody = document.querySelector("tbody.search-table")
      tbody.innerHTML=``
      data.map(product => {
    
      //  console.log("alternatife", product.QRcode.map(codes=>{
      //   codes.split(",").map(code=>{
      //    `<span>${code}</span>`
      //   })
      // }))
        const tr = document.createElement("tr")
         tr.innerHTML = `<th scope="row">${product.MainCode} </th>
             <td>
             ${product.ProductName}
             </td>
             <td>
             ${product.NumberOfProducts}
             </td>
             <td>
             ${product.UnitOfMeasurment}
             </td>
             <td>
             ${product.PurchasePrice}
             </td>
             <td>
             ${product.SellingPrice}
             </td>
             <td class="product-img-content">
               ${product.Link !== undefined? `<img height='40' src="/img/${product.Link}"" alt=''>` : "<h5>-</h5>"}
             </td>
             <td class=" codes">
               ${product.QRcode[0].split(",").map(code=>{
                if(code!==undefined){
                  return `<span>${code}</span></br>`
                }
              })}
           </td>`
           tr.classList.add("export-table")
           tbody.append(tr)
     
       })
    });
};
