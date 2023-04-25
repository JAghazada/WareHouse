// // corss between inputs
const inputs = [...document.querySelectorAll("input")];

const _p_name = document.querySelector(".preview-name");
const _p_count = document.querySelector(".preview-count");
const _p_unit = document.querySelector(".preview-unit");
const _p_price = document.querySelector(".preview-price");
const _p_selling_price = document.querySelector(".preview-selling-price");
const _p_barcodes = document.querySelector(".preview-qrcode");
const _p_img = document.querySelector("#preview-img");
window.onload = () => {
  inputs[0].focus();
};
window.addEventListener("keyup", (e) => {
  const activeElement = document.activeElement;
  const index = inputs.indexOf(activeElement);
  if (e.key === "ArrowDown") {
    inputs[index + 1].focus();
  } else if (e.key === "ArrowUp") {
    if (index > 0) inputs[index - 1].focus();
    else inputs[inputs.length - 2].focus();
  }
});
// document.querySelector(".custom-file-input").addEventListener("focus", () => {
//   document.querySelector(".custom-file-label").style.border =
//     "2px solid darkblue";
// });
const onlyNumbersRegex = /^[0-9]+$/

inputs.map((input) => {
  input.addEventListener("input", (e) => {
    if(input.classList[1]==="product_price" ||input.classList[1]=== "product_count" ||input.classList[1]=== "product_selling-price"){
      if( !onlyNumbersRegex.test(input.value))
      input.value = input.value.slice(0,-1)
    }
    if (input.classList[1] === "unit-1-inp") {

      document.querySelector(".preview-unit").innerText =
        e.target.value + " " + translateJson[UnitOfMeasurmentValue];
    } 
    
    else if (input.classList[1] === "unit-2-inp") {
      document.querySelector(".preview-unit-2").innerText =
        e.target.value + " " + translateJson[UnitOfMeasurmentValue_second];
    } 
    
    else if (input.classList[1] === "product_qrcode") {
      const regex = /^[0-9\s]+$/;
      const isValid = regex.test(input.value);
      if (!isValid) return false;
      document.querySelector(".preview-qrcode").innerText = e.target.value
        .split(" ")
        .join(",");
    } 
    
    else if (input.classList[0] === "custom-file-input") {
      return false;
    } 
    
    else {
      const inputClass = "preview-" + [...e.target.classList][1].split("_")[1];
      document.querySelector(`.${inputClass}`).innerText = e.target.value;
    }
  });
});
