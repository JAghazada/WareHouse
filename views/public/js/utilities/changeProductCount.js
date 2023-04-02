const changeProductCount = (id,updatedCount)=>{
    console.log(updatedCount);
    if(updatedCount <1 ){
        return false
    }
    setLoadingScreenState(true,"section>.lds-ring")
    fetch("/updateBasketProductCount",{
        method:"PUT",
        body:JSON.stringify({id,updatedCount}),
        headers:{
            "Content-Type":"application/json"
        }
    })
    .then(resp=>resp.json())
    .then(res=>{
        setLoadingScreenState(false,"section>.lds-ring");
        window.location="/basket"

    })
    .catch(err=>console.log(err))
}