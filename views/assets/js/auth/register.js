const registerButton = document.querySelector(".btn-register");
const userRegisterName = document.querySelector(".register-name");
const userRegisterPass = document.querySelector(".register-password");
const userRegisterRePass = document.querySelector(".register-re-password");

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
registerButton.addEventListener("click", (e) => {
  e.preventDefault();

  const userName = userRegisterName.value.trim();
  const userPass = userRegisterPass.value.trim();
  const userRePass = userRegisterRePass.value.trim();

  if (userName === "") {
    return showError(userRegisterName, "İstifadəçi adı yazılmalıdır!");
  } else {
    showSuccess(userRegisterName);
  }

  if (userPass === "") {
    return showError(userRegisterPass, "Şifrə yazılmalıdır!");
  } else {
    showSuccess(userRegisterPass);
  }

  if (userRePass === "") {
    return showError(userRegisterRePass, "Təkrar şifrə yazılmalıdır!");
  } else {
    showSuccess(userRegisterRePass);
  }

  //  ?pass must be equal repass
  if (userPass !== userRePass) {
    return showError(userRegisterRePass, "Təkrarlanan kod düzgün deyil!");
  }

  const formData = {
    name: userName,
    pass: userPass,
    repass: userRePass,
  };

  fetch("http://13.127.95.188:3000/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((resp) => resp.json())
    .then((res) => {
      if (res.success) {
        return (window.location.href = "/login"); // ! change route
      }
      // ? error handling
      alert("Bu istifadəçi artıq mövcuddur!");
    })
    .catch((err) => console.log(err));
});
