function handleProduct(){

    tr = document.querySelectorAll(".export-table");
    [...tr].map(element=>{
        element.addEventListener("click",(e)=>{
            const obj_id = e.target.parentNode.getAttribute("obj-id")
            getProductInfo(obj_id)
            
        })
    })
}
function getProductInfo(obj_id) {
  
    const formData = {obj_id}
    fetch("http://localhost:5000/productInfo",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(formData)
    }).then(res=>res.json())
    .then(info=>ModalOpen(info[0]))
}
const ModalOpen = (vals)=>{
    document.querySelector(".increase-wrapper>.card>.name>span").innerText=vals.ProductName 
    document.querySelector(".objidinp").value=vals._id
    document.querySelector(".increase-wrapper>.card>.count>span").innerText=vals.NumberOfProducts
    document.querySelector(".increase-wrapper>.card>.unit1>span").innerText=vals.Unit1 + " " + vals.UnitOfMeasurment
    document.querySelector(".increase-wrapper>.card>.unit2>span").innerText=vals.Unit2 + " " + vals.SecondUnitOfMeasurment
    document.querySelector(".increase-wrapper>.card>.cost-p>span").innerText=vals.PurchasePrice + "azn"
    document.querySelector(".increase-wrapper>.card>.cost-s>span").innerText=vals.SellingPrice + "azn"
    document.querySelector(".increase-wrapper>.card>.barcodes>span").innerText=vals.QRcode
    if(vals.Link !== undefined){
        // const img = document.createElement("img")
        const src = "/img/"+vals.Link
        const alt=vals.Link
        // console.log(img)
        document.querySelector(".increase-wrapper>.card>.img-area").innerHTML =`<img src=${src} alt=${alt}/>`

    }else{
        document.querySelector(".increase-wrapper>.card>.img-area").innerHTML =``
    }
    document.querySelector(".increase-wrapper").style.display = "flex";


}