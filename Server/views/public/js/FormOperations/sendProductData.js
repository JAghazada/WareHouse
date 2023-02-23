const submitForm = document.querySelector("form");
let UnitOfMeasurmentValue;
const UnitOfMeasurment= document.querySelector("#UnitOfMeasurment")
UnitOfMeasurment.addEventListener("change",(e)=>{
  UnitOfMeasurmentValue = (e.target.value)
})
submitForm.addEventListener("submit", (action) => {
  action.preventDefault();
  // const firstname = document.getElementById("name");
  // const lastname = document.getElementById("surname");
  // const files = document.getElementById("image");
  const productName= document.querySelector("#productName")
  const ChooseImage= document.querySelector("#ChooseImage")
  const productCount= document.querySelector("#productCount")
  const OneProductContentCount= document.querySelector("#OneProductContentCount")
  const Price= document.querySelector("#Price")
  const SellingPrice= document.querySelector("#SellingPrice")
  const QRcode= document.querySelector("#QRcode")
  const formData = new FormData();
  formData.append("NumberOfProducts",productCount.value)
  formData.append("OneProductContentCount",OneProductContentCount.value)
  formData.append("PurchasePrice",Price.value)
  formData.append("SellingPrice",SellingPrice.value)
  formData.append("QRcode",QRcode.value)
  formData.append("ProductName",productName.value)
  formData.append("files",ChooseImage.files[0])
  formData.append("UnitOfMeasurment",UnitOfMeasurmentValue)
  // formData.append("firstname", firstname.value);
  // formData.append("lastname", lastname.value);
  // for (let index = 0; index < files.files.length; index++) {
  //  formData.append("files",files.files[index])
  // }
  // console.log(formData)
  fetch("http://localhost:5000/uploadProduct", {
    method: "POST",
    body: formData,
  })
    .then((res) => res.json())
    .then((data) => console.log(data));
});
