const registerButton = document.querySelector(".btn-register");
const userRegisterName = document.querySelector(".register-name");
const userRegisterPass = document.querySelector(".register-password");
const userRegisterRePass = document.querySelector(".register-re-password");

registerButton.addEventListener("click",(e)=>{
    e.preventDefault();
    const userName =userRegisterName.value.trim();
    const userPass = userRegisterPass.value.trim();
    const userRePass = userRegisterRePass.value.trim();

    // ! alert messages

  

    // ?pass must be equal repass
    if(userPass !== userRePass){
      return  alert("Tekrarlanakod duzgundeyil")
    }
    const formData = {
        name:userName,
        pass:userPass,
        repass:userRePass
    };


    fetch("http://13.127.95.188:3000/register",{
        method:'POST',
        headers:{
            "Content-Type":"application/json"
        }        ,
        body:JSON.stringify(formData)
    })
    .then(resp=>resp.json())
    .then(res=>{
        if(res.success){
            return alert('Zortlandiq')
            return  window.location.href="../views/login.html" // ! change route
        }
        // ? error handling
       return  alert("Xeta bash verdi");
    })
    .catch(err=>console.log(err))
})