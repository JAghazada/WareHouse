const basket = document.querySelector(".basket");
document.querySelector(".basket-link").addEventListener("click", () => {
  if (basket.style.display === "block") {
    basket.style.display = "none";
  } else {
    basket.style.display = "block";
    fetch("/getBasketProducts", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((products) => {
        const productWrapper = document.querySelector(".product-wrapper");
        const totalPriceWrapper = document.querySelector(".total-price > span")
        let productsCost = 0 
        productWrapper.innerHTML = ``
        const allProductsCount = products.length;
        document.querySelector(".products-count").innerText = "Məhsul sayi: " +  allProductsCount;
        products.map((basketProduct) => {
          let basketComponent = document.createElement("div");
          basketComponent.classList.add("basket-component");
          basketComponent.innerHTML = `
            <div class="deleteProductFromBasket">x</div>
            <div class="basket-img">
              <img src="/img/${basketProduct.Link === undefined ? "" : basketProduct.Link}" alt="">
            </div>
            <div class="basket-product">
            <div class="item-title">${basketProduct.ProductName}</div>
              <div class="item-barcode">${basketProduct.MainCode}</div>
            <div class="d-flex btn-wrapper justify-content-between align-items-center">
              <div class="btn btn-danger">-</div>
              <span class="item-price">${basketProduct.productCount}</span>
              <div class="btn btn-success">+</div>
            </div></div>`;
          productWrapper.append(basketComponent);
          productsCost += parseFloat(basketProduct.SellingPrice) * parseFloat(basketProduct.productCount); 
         
        });
        productsCost= productsCost.toFixed(2);
        totalPriceWrapper.innerText = productsCost
      })
      .catch((err) => console.log(err));
      
  }
});


