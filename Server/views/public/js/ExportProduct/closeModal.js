const exportmodal = document.querySelector(".exportmodal")
const closeExport = document.querySelector(".closeExport")
const closeModal = () => {
    exportmodal.style.display = "none"
}
closeExport.addEventListener("click", closeModal)