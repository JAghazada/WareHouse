
const IDcrease = (formData)=>{
    fetch("http://localhost:5000/increaseProduct",{
        method:"POST",
        body:JSON.stringify(formData),
        headers:{
            'Content-Type':"application/json"
        }
    }).then(Res=>{
        console.log(Res.json())
    })
}