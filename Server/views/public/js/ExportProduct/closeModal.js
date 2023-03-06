const exportmodal = document.querySelector(".exportmodal")
const closeExport = document.querySelector(".closeExport")
const closeModal = () => {
    document.querySelector(".search-product").value = ""
    inpVal=""
    selectVal="ProductName"
    exportmodal.style.display = "none"
}
closeExport.addEventListener("click", closeModal)