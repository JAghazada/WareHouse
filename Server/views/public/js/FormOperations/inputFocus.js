// // corss between inputs
const inputs = [...document.querySelectorAll("input")];
const _p_name=document.querySelector(".preview-name");
const _p_count=document.querySelector(".preview-count");
const _p_unit=document.querySelector(".preview-unit");
const _p_price=document.querySelector(".preview-price");
const _p_selling_price=document.querySelector(".preview-selling-price");
const _p_barcodes=document.querySelector(".preview-qrcode");
const _p_img = document.querySelector("#preview-img");
window.onload = () => {
  inputs[0].focus();
};
window.addEventListener("keyup", (e) => {
  const activeElement = document.activeElement;
  const index = inputs.indexOf(activeElement);
  if (e.key === "ArrowDown") {
    inputs[index + 1].focus()
    console.log("dasbdksaj")
  } else if (e.key === "ArrowUp") {
    if (index > 0) inputs[index - 1].focus();
    else inputs[inputs.length - 2].focus();
  }
});
inputs.map(input=>{
  console.log(input.classList[1])
  if(input.classList[1]==="product_qrcode"){
    // alert()
    input.addEventListener("input",(e)=>{
      // console.log(document.querySelector(".preview-qrcode"))
      document.querySelector(".preview-qrcode").innerText = e.target.value.split(" ").join(",")
    })
  }
  else{
  input.addEventListener("input",(e)=>{
    // console.log([...e.target.classList][1])
    const inputClass  ="preview-" +  [...e.target.classList][1].split("_")[1]

    document.querySelector(`.${inputClass}`).innerText = e.target.value
  })}
})