const date= "2023-03-11"
const products = [
    {
        "_id": "640c9baaa23154aa350b950e",
        "ProductName": "xfdcghbjkl;,",
        "CompanyName": "9645230",
        "NumberOfProducts": 798465242,
        "PurchasePrice": 948651,
        "SellingPrice": 984651,
        "QRcode": [
            97849846,
            9846515,
            978465487,
            9846514879,
            "000316972"
        ],
        "MainCode": 97849846,
        "Link": "xfdcghbjkl;,_97849846.jpg",
        "UnitOfMeasurment": "number",
        "SecondUnitOfMeasurment": "number",
        "Unit1": 1,
        "Unit2": 1,
        "createdAt": "2023-03-11T15:18:02.594Z",
        "updatedAt": "2023-03-11T17:41:26.771Z",
        "__v": 1
    },
    {
        "_id": "640c9c04ff0d0a8810f68bc9",
        "ProductName": "SRDGHJK",
        "CompanyName": "89456230",
        "NumberOfProducts": 984666,
        "PurchasePrice": 978465,
        "SellingPrice": 49849848,
        "QRcode": [
            894984984894,
            8944894894,
            89489498984984,
            4894,
            31,
            31,
            31
        ],
        "MainCode": 894984984894,
        "UnitOfMeasurment": "number",
        "SecondUnitOfMeasurment": "number",
        "Unit1": 7984651,
        "Unit2": 1,
        "createdAt": "2023-03-11T15:19:32.725Z",
        "updatedAt": "2023-03-11T17:40:27.555Z",
        "__v": 3
    },
    {
        "_id": "640c9c4f293439de0e10b192",
        "ProductName": "DWQDWQD",
        "CompanyName": "WQDDQWDQW",
        "NumberOfProducts": 21,
        "PurchasePrice": 3123,
        "SellingPrice": 31231,
        "QRcode": [
            3123123123,
            312312312,
            "21312321312",
            "2"
        ],
        "MainCode": 3123123123,
        "UnitOfMeasurment": "number",
        "SecondUnitOfMeasurment": "number",
        "Unit1": 1,
        "Unit2": 1,
        "createdAt": "2023-03-11T15:20:47.747Z",
        "updatedAt": "2023-03-11T18:34:45.412Z",
        "__v": 2
    }
]
let list = []
products.map(product=>{
    console.log(product.createdAt.split("T")[0])
    if(product.createdAt.split("T")[0]===date || product.updatedAt.split("T")[0]===date){
        list.push(product)
    }
})
console.log(list)