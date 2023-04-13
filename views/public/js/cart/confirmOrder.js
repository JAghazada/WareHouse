const confirmOrderButton = document.querySelector(".confirm-order-btn");
const confirmOrder =()=>{
    fetch("/confirmOrder",{
        method:"POST",
        headers:{
            'Content-Type':'application/json'
        }
    })
    .then(res=>res.json())
    .then(res=>console.log(res))
    .catch(err=>console.log(err))
};
confirmOrderButton.addEventListener("click",confirmOrder);
