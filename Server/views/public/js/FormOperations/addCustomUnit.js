const addCustomUnit = document.querySelector(".selectUnit")
const unitofmeasurment_wrapper = document.querySelector(".unitofmeasurment-wrapper")
const unitofmeasurment = document.querySelector(".unitofmeasurment")
const measurmentNumberWrapper = document.querySelector(".measurmentNumberWrapper")
const span = document.querySelector(".measurmentNumberWrapper>label>span")
addCustomUnit.addEventListener("change",(event)=>{
    const unit = event.target.value
    if(unit==="custom")  unitofmeasurment_wrapper.style.display="block" ,  measurmentNumberWrapper.style.display="block"
    else unitofmeasurment_wrapper.style.display="none",measurmentNumberWrapper.style.display="none"
    
})
unitofmeasurment.addEventListener("keyup",(e)=>{
    const newUnit = (e.target.value)
    span.innerText =` ${newUnit}'da  `
})