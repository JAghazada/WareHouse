const increaseProductData = (formData)=>{
    fetch("/increaseProduct",{
        method:"POST",
        body:JSON.stringify(formData),
        headers:{
            'Content-Type':"application/json"
        }
    }).then(Res=>{
        console.log(Res.json())
    })
}

const increaseCostButton  = document.querySelector(".update-cost");
increaseCostButton.addEventListener("click",()=>{
    const alter_code = document.querySelector("#alter-code").value;
    const id = document.querySelector(".objidinp").value;
    const product_count = document.querySelector("#product-count").value;
    const formData = {
     obj_id :id ,
     alter_code,
     count:product_count,
     type:"increase"
    }
  
    // console.log(formData)
    increaseProductData(formData);
})

