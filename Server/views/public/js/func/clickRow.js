function handleProduct(){

    tr = document.querySelectorAll(".export-table");
    [...tr].map(element=>{
        element.addEventListener("click",(e)=>{
        const classLists = [...e.target.parentNode.classList]
        const obj_id = e.target.parentNode.getAttribute("obj-id")
        if(classLists.includes("decrease-count")){
            return getProductInfo(obj_id,"export")
        }

        getProductInfo(obj_id)
            
        })
    })
}

function getProductInfo(obj_id,type) {
  
    const formData = {obj_id}
    fetch("http://localhost:5000/productInfo",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(formData)
    }).then(res=>res.json())
    .then(info=>ModalOpen(info[0],type))
}
const ModalOpen = (vals,type)=>{
    if(type==="export"){
        openAddBasketModal(vals)
    }
//   console.log(vals)
//   console.log(type)


}