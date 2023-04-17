const loginButton = document.querySelector(".btn-login");
const userLoginName = document.querySelector(".login-name");
const userLoginPass = document.querySelector(".login-password");

loginButton.addEventListener("click", (e) => {
  e.preventDefault();

  const userName = userLoginName.value.trim();
  const userPass = userLoginPass.value.trim();

  // ?pass must be equal repass
  //   if (userPass !== userRePass) {
  //     return alert("Tekrarlanan kod duzgun deyil");
  //   }

  // alerts
  if (userName === "") {
    return alert("Ad yazilmalidir!");
  }
  if (userPass === "") {
    return alert("Sifre yazilmalidir!");
  }

  const formData = {
    name: userName,
    pass: userPass,
  };

  fetch("http://13.127.95.188:3000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((resp) => resp.json())
    .then((res) => {
      if (res.success) {
        return (window.location.href = "../views/home.html"); // ! change route
      }
      // ? error handling
      alert("Xeta bash verdi");
    })
    .catch((err) => console.log(err));
});
