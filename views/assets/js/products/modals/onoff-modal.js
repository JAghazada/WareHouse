const insertModal = document.querySelector(".insert-modal");
const increaseModal ="";
const decreaseModal = document.querySelector(".decrease-modal");



const closeModalButton = document.querySelector(".closeModal");
const insertButton = document.querySelector(".add-product-btn");
const closeButton = document.querySelector(".close")

const insertModalNavLink = document.querySelector(".insert-product-link");
const increaseProductLink = document.querySelector(".increase-product-link");
const decreaseProductLink = document.querySelector(".decrease-product-link");


increaseProductLink.addEventListener("click",()=>{
});

decreaseProductLink.addEventListener("click",()=>{
    return decreaseModal.style.display = "flex"
})
closeButton.addEventListener("click",(e)=>{
    e.target.parentNode.parentNode.parentNode.style.display="none";
})


insertButton.addEventListener("click",()=>{
    return insertModal.style.display="flex"
})

insertModalNavLink.addEventListener("click",()=>{
    return insertModal.style.display="flex"
}
)
closeModalButton.addEventListener("click",()=>{
    return insertModal.style.display="none"
})
