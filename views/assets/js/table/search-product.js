const tabelSearchInput = document.querySelector("input#table-search-input");
const tbody = document.querySelector("tbody");
const socket = io();
tabelSearchInput.addEventListener("input", (e) => {
  const search_value = e.target.value.trim();
  socket.emit("getProducts", search_value);
});
socket.on("products", (products) => {
    console.log(products);

  listProductsToTable(products)
});
const listProductsToTable = (products) => {
    tbody.innerHTML = ``
  products.map((product) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
        <td>#${product.MainCode} </td>
        <td class="prod-name-container"  onclick="handleOpenWrapper('${product._id}')" data-container-id="${product._id}">
        <div class="product-operation-wrapper" data-wrapper-id="${product._id}">
            <span class="p1">Mədaxil</span>
            <span class="p2">Məxaric</span>
            <div class="square-l">
            </div>
        </div>
        <img src="/uploads/${product.Link}" alt="product-img">${product.ProductName}</td>
        <td>${product.CompanyName}</td>
        <td style="color:#ed2939">${product.Date}</td>
        <td>${product.PurchasePrice}</td>
        <td>${product.SellingPrice}</td>
        <td>${product.UnitOfMeasurment}</td>
        <td>
            ${product.QRcode.map(code=>{
              return `#<span>${code}</span>`
            })}
        </td>
        <td class="table-operations">
        <img class="point" src="/icons/edit-icon.svg" alt="edit">
        <img class="point" src="/icons/delete-icon.svg" alt="delete">
        </td>
`;
    tbody.append(tr);
  });
};
