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
    fetch("/productInfo",{
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
    }else{
        let className = "increase-wrapper"
        type==="export" ? className = "decrease-wrapper" : className = "increase-wrapper"  
          document.querySelector(`.${className}>.card>.name>span`).innerText=vals.ProductName 
          document.querySelector(".objidinp").value=vals._id
          document.querySelector(`.${className}>.card>.count>span`).innerText=vals.NumberOfProducts
          document.querySelector(`.${className}>.card>.unit1>span`).innerText=vals.Unit1 + " " + vals.UnitOfMeasurment
          document.querySelector(`.${className}>.card>.unit2>span`).innerText=vals.Unit2 + " " + vals.SecondUnitOfMeasurment
          document.querySelector(`.${className}>.card>.cost-p>span`).innerText=vals.PurchasePrice + "azn"
          document.querySelector(`.${className}>.card>.cost-s>span`).innerText=vals.SellingPrice + "azn"
          document.querySelector(`.${className}>.card>.barcodes>span`).innerText=vals.QRcode
          if(vals.Link !== undefined){
              const src = "/img/"+vals.Link
              const alt=vals.Link
              document.querySelector(`.${className}>.card>.img-area`).innerHTML =`<img src=${src} alt=${alt}/>`
      
          }else{
              document.querySelector(`.${className}>.card>.img-area`).innerHTML =``
          }
          document.querySelector(`.${className}`).style.display = "flex";
    }

}