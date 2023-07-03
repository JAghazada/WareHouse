const submitForm = document.querySelector("form");
const translateJson = {
  number: "Əd",
  kg: "Kg",
  cm: "Sm",
  dm: "Dm",
  box: "Qutu",
  meter: "Metr",
  block: "Blok",
  wholesale: "Top",
  bag: "Kisə",
  set: "Dəst",
  packet: "Paket",
};

let UnitOfMeasurmentValue = "number";
let UnitOfMeasurmentValue_second = "number";
const UnitOfMeasurment = document.querySelector("#UnitOfMeasurment");
const UnitOfMeasurment_second = document.querySelector("#UnitOfMeasurment2");
UnitOfMeasurment.addEventListener("change", (e) => {
  UnitOfMeasurmentValue = e.target.value;
  document.querySelector(".preview-unit").innerText =
    document.querySelector(".unit-1-inp").value +
    " " +
    translateJson[UnitOfMeasurmentValue];
  document.querySelector(".unit-v1").innerText =
    translateJson[UnitOfMeasurmentValue];
});
UnitOfMeasurment_second.addEventListener("change", (e) => {
  UnitOfMeasurmentValue_second = e.target.value;
  document.querySelector(".preview-unit-2").innerText =
    document.querySelector(".unit-2-inp").value +
    " " +
    translateJson[UnitOfMeasurmentValue_second];
  document.querySelector(".unit-v2").innerText =
    translateJson[UnitOfMeasurmentValue_second];
});

// !disable enter key for sumbit form
// submitForm.addEventListener("keypress",(key)=>{
//   if(key.keyCode === 13) return key.preventDefault()
//   else return false
// })

submitForm.addEventListener("submit", (action) => {
  action.preventDefault();
  // const firstname = document.getElementById("name");
  // const lastname = document.getElementById("surname");
  // const files = document.getElementById("image");
  const companyName = document.querySelector(".product_company");
  const unit1 = document.querySelector(".unit-1-inp");
  const unit2 = document.querySelector(".unit-2-inp");
  const productName = document.querySelector("#productName");
  const ChooseImage = document.querySelector("#ChooseImage");
  const productCount = document.querySelector("#productCount");
  const OneProductContentCount = document.querySelector(
    "#OneProductContentCount"
  );
  const Price = document.querySelector("#Price");
  const SellingPrice = document.querySelector("#SellingPrice");
  const QRcode = document.querySelector("#QRcode");
  const formData = new FormData();
  formData.append("NumberOfProducts", productCount.value);
  formData.append("Unit1", unit1.value);
  formData.append("Unit2", unit2.value);
  formData.append("CompanyName", companyName.value);
  formData.append("PurchasePrice", Price.value);
  formData.append("SellingPrice", SellingPrice.value);
  formData.append(
    "QRcode",
    QRcode.value.split(" ").map((code) => (code))
  );
  formData.append(
    "MainCode",
    QRcode.value.split(" ").map((code) => (code))[0]
  );
  formData.append("ProductName", productName.value);
  formData.append("files", ChooseImage.files[0]);
  formData.append("UnitOfMeasurment", UnitOfMeasurmentValue);
  formData.append("SecondUnitOfMeasurment", UnitOfMeasurmentValue_second);
  try {
    const extList = ChooseImage.files[0].name.split(".");
    const extension = extList[extList.length - 1];
    const link =
      productName.value +
      "_" +
      QRcode.value.split(" ").map((code) => (code))[0] +
      "." +
      extension;
    formData.append("Link", link);
  } catch (error) {
  } finally {
    fetch("/uploadProduct", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  }
});
