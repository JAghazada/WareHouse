const entryCountDiv = document.querySelector(".entry-count");
const entryCountDropdown = document.querySelector(".entry-count-dropdown");
const styleProp = {
    zIndex : "1",
    visibility:"visible",
    opacity : "1"

}
entryCountDiv.addEventListener("click",()=>{
    if(entryCountDropdown.style.opacity !== "1") return Object.assign(entryCountDropdown.style, styleProp);
    return Object.assign(entryCountDropdown.style,{
        zIndex : "-1",
        visibility:"hidden",
        opacity : "0"
    })
    
})
