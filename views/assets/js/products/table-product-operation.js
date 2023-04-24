const prodNameContainers = [
  ...document.querySelectorAll(".prod-name-container"),
];
let display = false;
prodNameContainers.map((prodNameContainer) => {
 
  prodNameContainer.addEventListener("click", (event) => {
    const prodContainerID = prodNameContainer.getAttribute("data-container-id");
    const productOperationWrapper = document.querySelector(
      `.product-operation-wrapper[data-wrapper-id="${prodContainerID}"]`
    );
    const openedWrapper =  document.querySelector(".open-wrapper") 


    if([...productOperationWrapper.classList].indexOf("open-wrapper")===-1){
        if(openedWrapper){
            openedWrapper.classList.remove("open-wrapper")
        }
        return  productOperationWrapper.classList.add("open-wrapper")
    }
  
    return productOperationWrapper.classList.remove("open-wrapper")
    // return Object.assign(productOperationWrapper.style, styleJSON);

  });
});
// prodNameContainer.addEventListener("click",(event)=>{
//     console.log(event.target);
//     display = !display
//
//     return  Object.assign(productOperationWrapper.style,styleJSON);
// })
