const PrintButton = document.querySelector(".print-content");
const PrintableContent  = document.querySelector("table")
PrintButton.addEventListener("click",()=>{
    PrintableContent.style.fontSize="10px"
    const opt = {
        margin: 1,
        filename: 'table.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
      };
    html2pdf().from(PrintableContent).set(opt).save().then(()=>{
        PrintableContent.style.fontSize="16px";
    });
})