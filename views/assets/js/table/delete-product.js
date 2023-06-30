const deleteProductHandler = (id)=>{
    const isConfirmed = confirm("Mehsulu silmek isteyirsiniz ?");
    if(isConfirmed){
         fetch("/deleteProduct",{
            method:"DELETE",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                product_id:id
            })
        })
        .then(res=>res.json())
        .then(res=>console.log(res))
        .catch(err=>console.log(err))
    }
}