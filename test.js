list = ["productName","ChooseImage","productCount","OneProductContentCount","productImage","UnitOfMeasurment","Price","SellingPrice","QRcode"];

for(c of list){
    console.log(`const ${c}= document.querySelector("#${c}")`)
}