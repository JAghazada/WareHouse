const authWrapper = document.querySelector(".auth-wrapper");
const registerLink = document.querySelector(".auth-register");
const loginLink = document.querySelector(".auth-login");
const wrapperLogin = document.querySelector(".login-wrapper");
const wrapperRegister = document.querySelector(".register-wrapper");
const authLinks = [...document.querySelectorAll(".auth-links>a")];
// ! signup wrappers' inputs
const registerName = document.querySelector(".register-name");
const registerPass = document.querySelector(".register-pass");
const registerRePass = document.querySelector(".register-re-pass");
// ! login wrapper's input
const loginName = document.querySelector(".login-name");
const loginPass = document.querySelector(".login-pass");
// !buttons
const loginButton=document.querySelector(".login-btn") 
const registerButton=document.querySelector(".register-btn") 
authLinks.map(link => {
    link.addEventListener("click", (e) => {
        e.preventDefault()
        const activeLink = document.querySelector(".active-link");
        if (activeLink !== null) {
            activeLink.classList.remove("active-link")
            activeLink.style.color = "#000"

        }
        e.target.classList.add("active-link")

    })
})
loginLink.addEventListener("click",()=>{
    authWrapper.style.height= "370px";
    wrapperRegister.style.display="none";
    wrapperLogin.style.display = "block";
})
registerLink.addEventListener("click",()=>{
    authWrapper.style.height= "420px";
    wrapperLogin.style.display="none";
    wrapperRegister.style.display = "block";
})

// !register user
registerButton.addEventListener("click",(e)=>{
    e.preventDefault();
    const name =registerName.value.trim();
    const pass = registerPass.value.trim();
    const repass = registerRePass.value.trim();
    const registerData = {name,pass,repass}
    fetch("/register",{
        method:"POST",
        body:JSON.stringify(registerData),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=>res.json())
    .then(resp=>console.log(resp.success))
    .catch(err=>console.log(JSON.stringify(err)))
})