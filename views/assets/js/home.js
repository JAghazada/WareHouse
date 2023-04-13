const burgerMenuIcon = document.querySelector(".burger-menu");
const navLinks = document.querySelector(".nav-links");
const nav = document.querySelector("nav");
const lines = document.querySelectorAll('.line');
const basketIcon  = document.querySelector(".basket-icon");
const animatedElements = [...document.querySelectorAll(".animate-to-left")]
const searchAnswerWrapper = document.querySelector(".search-answer-wrapper");
const searchInput = document.querySelector(".search-answer-wrapper");
const basketWrapper = document.querySelector(".basket-wrapper")
burgerMenuIcon.addEventListener("click", (event) => {
  if (navLinks.style.display !== "flex") {
    navLinks.style.display = "flex";
    nav.style.justifyContent = "space-between";
  } else {
    navLinks.style.display = "none";
    nav.style.justifyContent = "end";
  }
  burgerMenuIcon.classList.toggle("active");
});


window.addEventListener('resize', function() {
    if(window.innerWidth > 925 ){
        navLinks.style.display = "flex";
       return  nav.style.justifyContent = "space-between";

    }else{
        burgerMenuIcon.classList.remove("active");
        navLinks.style.display = "none";
        nav.style.justifyContent = "end";
    }
  });
const moveToLeft = ()=>{
  
}
basketIcon.addEventListener("click",()=>{
  // if(window.innerWidth < 1340){
  //   return window.location.href = "/basket"
  // }
  if(basketWrapper.style.opacity !== "1"){
    basketWrapper.style.opacity = "1"
    animatedElements.map(element=>{
      element.classList.remove("moveToLeft")
      element.classList.add("moveToRight")
    })
    
  

}else{
    basketWrapper.style.opacity = "0"
    animatedElements.map(element=>{
      element.classList.remove("moveToRight")
      element.classList.add("moveToLeft")
  
    })
   
}
 
  
})