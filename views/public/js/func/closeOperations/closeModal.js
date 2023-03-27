
[...document.querySelectorAll(".close")].map(element => {
    element.addEventListener("click",()=>{
        element.parentNode.parentNode.parentNode.style.display = "none"

    })
})