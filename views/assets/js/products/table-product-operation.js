
 const handleOpenWrapper=(prodContainerID)=>{
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
 }
  
