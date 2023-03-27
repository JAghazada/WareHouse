
const IDcrease = (formData)=>{
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