// // corss between inputs
const inputs = [...document.querySelectorAll("input")];

window.onload = () => {
  inputs[0].focus();
};
window.addEventListener("keyup", (e) => {
  const activeElement = document.activeElement;
  const index = inputs.indexOf(activeElement);
  if (e.key === "ArrowDown" || e.key === "Enter") {
    console.log();
    if (inputs[index + 1].classList[1] === "unitofmeasurment") {
        return  inputs[index + 1].val(2).trigger("change") 
    } else {
      if (index < inputs.length - 1) inputs[index + 1].focus();
      else inputs[0].focus();
    }
  } else if (e.key === "ArrowUp") {
    if (index > 0) inputs[index - 1].focus();
    else inputs[inputs.length - 2].focus();
  }
});
// ArrowUp
// ArrowDown
// ArrowLeft
// ArrowRigh
