const listToTable = (data ,tbody,type)=>{
    tbody.innerHTML=``
    data.map(product => {
      const tr = document.createElement("tr")
      tr.setAttribute("obj-id",product._id)
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
             ${product.QRcode.map(code=>{
              if(code!==undefined){
                // console.log("thisISQr ",code)
                return `<span>${code}</span>`
              }
            })}
         </td>`
         if(type==="export"){
          tr.classList.add("decrease-count")
         }
           tr.classList.add("export-table");


         tbody.append(tr)
   
     })
     handleProduct()
  }

const listUsers = async(name=inpVal,selectType=selectVal) => {
  
  const formData = {
    name: inpVal,
    selectVal:selectType,
  };
 const data = await fetch("http://localhost:5000/getProducts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
  return data  
};