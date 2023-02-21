const submitForm = document.querySelector("form");
submitForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const firstname = document.getElementById("name");
  const lastname = document.getElementById("surname");
  const files = document.getElementById("image");
  const formData = new FormData();
  formData.append("firstname", firstname.value);
  formData.append("lastname", lastname.value);
  for (let index = 0; index < files.files.length; index++) {
   formData.append("files",files.files[index])
  }
  fetch("http://localhost:5000/uploadProduct", {
    method: "POST",
    body: formData,
  })
    .then((res) => res.json())
    .then((data) => console.log(data));
});
