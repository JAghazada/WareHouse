const basket = document.querySelector(".basket");
let vinimatelniProductArray = []
document.addEventListener("click", (event) => {
  if (!basket.contains(event.target) && basket.style.display === "block") {
    console.log("Aaaaaa");
    basket.style.display = "none";
  }
});
document.querySelector(".basket-link").addEventListener("click", (event) => {
  if (basket.style.display === "block") {
    basket.style.display = "none";
  } else {
    basket.style.display = "block";
    fetch("/getBasketProducts", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((products) => {
        vinimatelniProductArray = [...vinimatelniProductArray,...products]
        const productWrapper = document.querySelector(".product-wrapper");
        const totalPriceWrapper = document.querySelector(".total-price > span");
        let productsCost = 0;
        productWrapper.innerHTML = ``;
        const allProductsCount = products.length || 0;
        document.querySelector(".products-count").innerText =
          "Məhsul sayi: " + allProductsCount;
        products.map((basketProduct) => {
          let basketComponent = document.createElement("div");
          basketComponent.setAttribute("data-product-id", basketProduct._id);
          basketComponent.setAttribute(
            "data-product-count",
            basketProduct.productCount
          );
          basketComponent.classList.add("basket-component");
          basketComponent.innerHTML = `
            <div class="deleteProductFromBasket">x</div>
            <div class="basket-img">
              <img src="/img/${
                basketProduct.Link === undefined ? "" : basketProduct.Link
              }" alt="">
            </div>
            <div class="basket-product">
            <div class="item-title">${basketProduct.ProductName}</div>
              <div class="item-barcode">${basketProduct.MainCode}</div>
            <div class="d-flex btn-wrapper justify-content-between align-items-center">
              <div class="btn quantity-btn decrease-quantity-btn  btn-danger">-</div>
              <span data-prod-count = "${basketProduct._id}"  class="item-price">${basketProduct.productCount}</span>
              <div class="btn quantity-btn increase-quantity-btn btn-success">+</div>
            </div></div>`;
          productWrapper.append(basketComponent);
          productsCost +=
            parseFloat(basketProduct.SellingPrice) *
            parseFloat(basketProduct.productCount);

          basketComponent.addEventListener("click", async (event) => {
            const porductID = basketComponent.dataset.productId;
            const getClass = [...event.target.classList];
            if (getClass.indexOf("deleteProductFromBasket") !== -1) {
              removeElement(porductID);
            }
            if (getClass.indexOf("decrease-quantity-btn") !== -1) {
              if(basketProduct.productCount > 1 )basketProduct.productCount--;
             document.querySelector(`[data-prod-count="${basketProduct._id}"]`).innerText = basketProduct.productCount;
            }
             if (getClass.indexOf("increase-quantity-btn") !== -1) {
              if(basketProduct.productCount < basketProduct.NumberOfProducts )basketProduct.productCount++;
              document.querySelector(`[data-prod-count="${basketProduct._id}"]`).innerText = basketProduct.productCount;
            }
          });
        });

        productsCost = productsCost.toFixed(2);
        totalPriceWrapper.innerText = productsCost;
      })
      .catch((err) => console.log(err));
  }
  event.stopPropagation();
});
const removeElement = (id) => {
  fetch("/deleteFromBasket", {
    method: "POST",
    body: JSON.stringify({ id }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((res) => console.log(res));
};
