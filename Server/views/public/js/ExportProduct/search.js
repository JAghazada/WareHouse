const searchInput = document.querySelector(".search-product");
const selectBox = document.querySelector(".select-type");
let selectVal = "name";
let inpVal = "";
selectBox.addEventListener("change", (e) => {
  selectVal = e.target.value;
  listUsers();
});
searchInput.addEventListener("input", (e) => {
  inpVal = e.target.value;
  listUsers();
});
const listUsers = () => {
  const formData = {
    name: inpVal,
    selectVal,
  };
  fetch("http://localhost:5000/getProducts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((res) => res.json())
    .then((data) => console.log(data));
};
