let D_U2 =  document.querySelector("._d-u2")
let D_ProductInput = document.querySelector("._d-pr-add-count")
D_ProductInput.addEventListener("input",(e)=>{
const numVal = parseFloat(e.target.value);
D_U2.innerHTML = `${numVal*data.Unit2} ${data.SecondUnitOfMeasurment}`
})