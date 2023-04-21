const loginButton = document.querySelector(".btn-login");
const userLoginName = document.querySelector(".login-name");
const userLoginPass = document.querySelector(".login-password");

// Error function
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = "form-control error";
  const span = formControl.querySelector(".err-message");
  span.innerText = message;
}

// Success function
function showSuccess(input) {
  formControl = input.parentElement;
  formControl.className = "form-control success";
}

// Event listener
loginButton.addEventListener("click", (e) => {
  e.preventDefault();

  const userName = userLoginName.value.trim();
  const userPass = userLoginPass.value.trim();

  if (userLoginName.value === "") {
    showError(userLoginName, "İstifadəçi adı yazılmalıdır!");
  } else {
    showSuccess(userLoginName);
  }

  if (userLoginPass.value === "") {
    showError(userLoginPass, "Şifrə yazılmalıdır!");
  } else {
    showSuccess(userLoginPass);
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
      if(res.success === false){
        showError(userLoginName,"Şifrə və ya istifadəçi adı yanlışdır"); 
        return showError(userLoginPass,""); 
      }
      // ? error handling
      alert("Xeta bash verdi");
    })
    .catch((err) => console.log(err));
});
