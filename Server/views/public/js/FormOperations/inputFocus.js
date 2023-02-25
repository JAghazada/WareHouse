// // corss between inputs
const inputs = [...document.querySelectorAll("input")];

window.onload = () => {
  inputs[0].focus();
};
window.addEventListener("keyup", (e) => {
  const activeElement = document.activeElement;
  const index = inputs.indexOf(activeElement);
  if (e.key === "ArrowDown" || e.key === "Enter") {
    inputs[index + 1].focus()
    console.log("dasbdksaj")
  } else if (e.key === "ArrowUp") {
    if (index > 0) inputs[index - 1].focus();
    else inputs[inputs.length - 2].focus();
  }
});
