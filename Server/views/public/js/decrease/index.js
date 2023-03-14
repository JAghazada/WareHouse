const decreaseProductCountButton = document.querySelector(".d-update-cost");

decreaseProductCountButton.addEventListener("click",()=>{
    const DCost =document.querySelector("#d-count").value.trim();
    const obj_id =document.querySelector(".objidinp").value
    const formData = {
        obj_id,
        count:DCost,
        type:"decrease"
    }
    IDcrease(formData)
})