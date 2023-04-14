const Tag_A = [...document.querySelectorAll("a")];
Tag_A.map(tag=>{
    tag.addEventListener("click",(e)=>{
        e.preventDefault()
    })
})