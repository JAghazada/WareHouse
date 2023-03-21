const addBasketModal = document.querySelector(".decrease-modal");
let D_ProductName = document.querySelector("._d-pr-name>span")
let D_ProductBarcode = document.querySelector("._d-pr-barcode>span")
let D_ProductCount = document.querySelector("._d-pr-count>span")
let D_ProductPrice = document.querySelector("._d-pr-price>span")
let D_ProductInput = document.querySelector("._d-pr-add-count")
let D_ProductUnit = document.querySelector("._d-pr-unit>span");
let D_equals = document.querySelector("._d-pr-equals");
let D_ProductImg = document.querySelector("._d-img");
const addBasketButton = document.querySelector(".add-basket-button");
let D_U1 =  document.querySelector("._d-u1")
let D_U2 =  document.querySelector("._d-u2")
let data; 
D_ProductInput.addEventListener("input",(e)=>{
    const numVal = parseFloat(e.target.value);
    D_U2.innerHTML = `${numVal*data.Unit2} ${data.SecondUnitOfMeasurment}`
})
const openAddBasketModal=(vals)=>{
    data = {...vals}
    addBasketModal.style.display = "flex";
    D_U1.innerHTML = `${data.UnitOfMeasurment}`
    D_U2.innerHTML = `${data.SecondUnitOfMeasurment}`
    D_equals.innerHTML = `${data.Unit1} ${data.UnitOfMeasurment} = ${data.Unit2} ${data.SecondUnitOfMeasurment}`
    D_ProductImg.setAttribute("src","/img/"+data.Link)
    D_ProductBarcode.innerHTML=`${data.MainCode}`
    D_ProductName.innerHTML=`${data.ProductName}`
    D_ProductCount.innerHTML=`${data.NumberOfProducts}`
    D_ProductPrice.innerHTML=`${data.SellingPrice}`
    D_ProductUnit.innerHTML=`${data.Unit1} ${data.UnitOfMeasurment}`
}
addBasketButton.addEventListener("click",(e)=>{
    e.preventDefault();
    //? fetch operations
})