const socket = io();
// socket.emit("chat",{msg:"test"})
socket.on('all-products', data => {
  const tbody = document.querySelector("tbody.real-table");

  tbody.innerHTML = ``
  data.products.map(product => {
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
          ${product.QRcode.map(codes=>{
            codes.split(",").map(code=>{
             `<span>${code}</span>`
            })
          })}
      </td>`
      tbody.append(tr)

  })
})