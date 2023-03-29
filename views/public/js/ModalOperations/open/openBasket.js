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
        const allProductsCount = products.length || 0 ;
        document.querySelector(".products-count").innerText = "Məhsul sayi: " +  allProductsCount;
        products.map((basketProduct) => {
          let basketComponent = document.createElement("div");
          basketComponent.setAttribute("data-product-id", basketProduct._id);
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
              <div class="btn quantity-btn decrease-quantity-btn  btn-danger">-</div>
              <span class="item-price">${basketProduct.productCount}</span>
              <div class="btn quantity-btn increase-quantity-btn btn-success">+</div>
            </div></div>`;
          productWrapper.append(basketComponent);
          productsCost += parseFloat(basketProduct.SellingPrice) * parseFloat(basketProduct.productCount); 
          const deleteButton = basketComponent.querySelector(".deleteProductFromBasket");
          const quantityButton =  document.querySelectorAll(".btn.quantity-btn");
          [...quantityButton].map(btn=>btn.addEventListener("click",(event)=>{
            console.log([...event.target.classList]);
             const className =[...event.target.classList].indexOf("increase-quantity-btn"); 
             if(className === -1){
              // ? increase
              if(basketProduct.productCount > 0){
                 basketProduct.productCount --;
              }
              document.querySelector(".item-price").innerText = `${basketProduct.productCount} `
             }else{
              basketProduct.productCount ++;
              document.querySelector(".item-price").innerText = `${basketProduct.productCount} `
             }
             
             
          }))
          basketComponent.addEventListener("click", async(event) => {
            if([...event.target.classList].indexOf("deleteProductFromBasket")!==-1){
              const porductID = basketComponent.dataset.productId;
               removeElement(porductID);
            }
          });
          

        });
        productsCost= productsCost.toFixed(2);
        totalPriceWrapper.innerText = productsCost
      })
      .catch((err) => console.log(err));
      
  }
});
const removeElement = (id)=>{
   fetch("/deleteFromBasket",{
    "method":"POST",
    body:JSON.stringify({id}),
    headers:{
      "Content-Type":"application/json"
    }
  }).then(res=>res.json())
  .then(res=>console.log(res))
};

