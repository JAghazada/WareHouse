const burgerMenuIcon = document.querySelector(".burger-icon");
const navLinks = document.querySelector(".nav-links");
const nav = document.querySelector("nav");
const lines = document.querySelectorAll(".line");
const basketIcon = document.querySelector(".basket-icon>img");
const animatedElements = [...document.querySelectorAll(".animate-to-left")];
const searchAnswerWrapper = document.querySelector(".search-answer-wrapper");
const searchInput = document.querySelector(".search-answer-wrapper");
const basketWrapper = document.querySelector(".basket-wrapper");
const profileIcon = document.querySelector(".profile-icon >img");
const profileMenu = document.querySelector(".profile-wrapper");
const mainMenu = document.querySelector("ul#menu");
burgerMenuIcon.addEventListener("click", (event) => {
  burgerMenuIcon.classList.toggle("active");
  if (mainMenu.style.visibility !== "visible") {
    mainMenu.style.visibility = "visible";
  } else {
    mainMenu.style.visibility = "hidden";
  }
});

window.addEventListener("resize", function () {
  if (window.innerWidth > 623) {
    mainMenu.style.visibility = "visible";
  } else {
    mainMenu.style.visibility = "hidden";

    burgerMenuIcon.classList.remove("active");
  }
});
const moveToLeft = () => {};
basketIcon.addEventListener("click", () => {
  if (basketWrapper.style.opacity !== "1") {
    basketWrapper.style.opacity = "1";
    basketWrapper.style.zIndex = "1";

    animatedElements.map((element) => {
      element.classList.remove("moveToLeft");
      element.classList.add("moveToRight");
    });
  } else {
    basketWrapper.style.opacity = "0";
    basketWrapper.style.zIndex = "-1";
    animatedElements.map((element) => {
      element.classList.remove("moveToRight");
      element.classList.add("moveToLeft");
    });
  }
});
profileIcon.addEventListener("click", () => {
  if (profileMenu.style.opacity !== "1") {
    profileMenu.style.opacity = "1";
    profileMenu.style.zIndex = "1";
  } else {
    profileMenu.style.opacity = "0";
    profileMenu.style.zIndex = "-1";
  }
});
