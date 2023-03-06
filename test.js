
const translateJson = {
    number: "Əd",
    kg: "Kg",
    cm: "Sm",
    dm: "Dm",
    box: "Qutu",
    meter: "Metr",
    block: "Blok",
    wholesale: "Top",
    bag: "Kisə",
    set: "Dəst",
    packet: "Paket",
  };
const products =[
    {
      _id: `new ObjectId("64023ffcbdc81083e979b036")`,
      ProductName: 'Test',
      CompanyName: 'Seymur',
      NumberOfProducts: 12,
      PurchasePrice: 56,
      SellingPrice: 68,
      QRcode: [ '123782139239812,910283,9.128309218390219e+29,31283210' ],
      MainCode: 123782139239812,
      UnitOfMeasurment: 'number',
      SecondUnitOfMeasurment: 'number',
      Unit1: 1,
      Unit2: 1,
      createdAt: "2023-03-03T18:44:12.938Z",
      updatedAt: "2023-03-03T18:44:12.938Z",
      __v: 0
    },
    {
      _id: `new ObjectId("64023e91bdc81083e979b030")`,
      ProductName: 'dasdasd',
      CompanyName: 'dsadasda',
      NumberOfProducts: 15,
      PurchasePrice: 51,
      SellingPrice: 155,
      QRcode: [ '555' ],
      MainCode: 555,
      UnitOfMeasurment: 'number',
      SecondUnitOfMeasurment: 'number',
      Unit1: 1,
      Unit2: 1,
      createdAt: "2023-03-03T18:38:09.899Z",
      updatedAt: "2023-03-03T18:38:09.899Z",
      __v: 0
    },
    {
      _id: `new ObjectId("64023e8ebdc81083e979b02e")`,
      ProductName: 'dasdasd',
      CompanyName: 'dsadasda',
      NumberOfProducts: 15,
      PurchasePrice: 51,
      SellingPrice: 155,
      QRcode: [ '555' ],
      MainCode: 555,
      Link: 'dasdasd_555.png',
      UnitOfMeasurment: 'number',
      SecondUnitOfMeasurment: 'number',
      Unit1: 1,
      Unit2: 1,
      createdAt: "2023-03-03T18:38:06.223Z",
      updatedAt: "2023-03-03T18:38:06.223Z",
      __v: 0
    },
    {
      _id: `new ObjectId("64023d776999bf8b30128662")`,
      ProductName: 'eqweqwew',
      CompanyName: 'qewqeqwe',
      NumberOfProducts: 213,
      PurchasePrice: 12321,
      SellingPrice: 3321321,
      QRcode: [ '31231231' ],
      MainCode: 31231231,
      Link: 'eqweqwew_31231231.png',
      UnitOfMeasurment: 'number',
      SecondUnitOfMeasurment: 'number',
      Unit1: 1,
      Unit2: 1,
      createdAt: "2023-03-03T18:33:27.830Z",
      updatedAt: "2023-03-03T18:33:27.830Z",
      __v: 0
    },
    {
      _id: `new ObjectId("64023d756999bf8b30128660")`,
      ProductName: 'eqweqwew',
      CompanyName: 'qewqeqwe',
      NumberOfProducts: 213,
      PurchasePrice: 12321,
      SellingPrice: 3321321,
      QRcode: [ '31231231' ],
      MainCode: 31231231,
      Link: 'eqweqwew_31231231.png',
      UnitOfMeasurment: 'number',
      SecondUnitOfMeasurment: 'number',
      Unit1: 1,
      Unit2: 1,
      createdAt: "2023-03-03T18:33:25.979Z",
      updatedAt: "2023-03-03T18:33:25.979Z",
      __v: 0
    },
    {
      _id: `new ObjectId("64023d4629db1fae20f3a26a")`,
      ProductName: 'qaqaqaaaaaaaaaa',
      CompanyName: 'dqwwqdqwdqw',
      NumberOfProducts: 13,
      PurchasePrice: 123,
      SellingPrice: 3213,
      QRcode: [ '31232131,123,12312312,312,12,1' ],
      MainCode: 31232131,
      Link: 'qaqaqaaaaaaaaaa_31232131.png',
      UnitOfMeasurment: 'number',
      SecondUnitOfMeasurment: 'number',
      Unit1: 1,
      Unit2: 1,
      createdAt: "2023-03-03T18:32:38.168Z",
      updatedAt: "2023-03-03T18:32:38.168Z",
      __v: 0
    },
    {
      _id: `new ObjectId("64023d3c29db1fae20f3a268")`,
      ProductName: 'dqwdqw',
      CompanyName: 'dqwwqdqwdqw',
      NumberOfProducts: 13,
      PurchasePrice: 123,
      SellingPrice: 3213,
      QRcode: [ '31232131,123,12312312,312,12,1' ],
      MainCode: 31232131,
      Link: 'dqwdqw_31232131.png',
      UnitOfMeasurment: 'number',
      SecondUnitOfMeasurment: 'number',
      Unit1: 1,
      Unit2: 1,
      createdAt: "2023-03-03T18:32:28.957Z",
      updatedAt: "2023-03-03T18:32:28.957Z",
      __v: 0
    },
    {
      _id: `new ObjectId("64023cfef2f26b4d627e2c9d")`,
      ProductName: 'hambalbled',
      CompanyName: 'dasdsada',
      NumberOfProducts: 12,
      PurchasePrice: 12,
      SellingPrice: 18,
      QRcode: [ '458416496,681,1986165161616531' ],
      MainCode: 458416496,
      Link: 'hambalbled_458416496.png',
      UnitOfMeasurment: 'box',
      SecondUnitOfMeasurment: 'number',
      Unit1: 1,
      Unit2: 6,
      createdAt: "2023-03-03T18:31:26.078Z",
      updatedAt: "2023-03-03T18:31:26.078Z",
      __v: 0
    }
  ]
  const final_data = []
  products.map(product=>{
    console.log(product)
    const _finalproduct = {...product,"UnitOfMeasurment":translateJson[product.UnitOfMeasurment.toLowerCase()],"SecondUnitOfMeasurment":translateJson[product.SecondUnitOfMeasurment.toLowerCase()]}
    final_data.push(_finalproduct)
})
console.log(final_data)
[
    {
      _id: 'new ObjectId("64023ffcbdc81083e979b036")',
      ProductName: 'Test',
      CompanyName: 'Seymur',
      NumberOfProducts: 12,
      PurchasePrice: 56,
      SellingPrice: 68,
      QRcode: [ '123782139239812,910283,9.128309218390219e+29,31283210' ],
      MainCode: 123782139239812,
      UnitOfMeasurment: 'Əd',
      SecondUnitOfMeasurment: 'Əd',
      Unit1: 1,
      Unit2: 1,
      createdAt: '2023-03-03T18:44:12.938Z',
      updatedAt: '2023-03-03T18:44:12.938Z',
      __v: 0
    },
    {
      _id: 'new ObjectId("64023e91bdc81083e979b030")',
      ProductName: 'dasdasd',
      CompanyName: 'dsadasda',
      NumberOfProducts: 15,
      PurchasePrice: 51,
      SellingPrice: 155,
      QRcode: [ '555' ],
      MainCode: 555,
      UnitOfMeasurment: 'Əd',
      SecondUnitOfMeasurment: 'Əd',
      Unit1: 1,
      Unit2: 1,
      createdAt: '2023-03-03T18:38:09.899Z',
      updatedAt: '2023-03-03T18:38:09.899Z',
      __v: 0
    },
    {
      _id: 'new ObjectId("64023e8ebdc81083e979b02e")',
      ProductName: 'dasdasd',
      CompanyName: 'dsadasda',
      NumberOfProducts: 15,
      PurchasePrice: 51,
      SellingPrice: 155,
      QRcode: [ '555' ],
      MainCode: 555,
      Link: 'dasdasd_555.png',
      UnitOfMeasurment: 'Əd',
      SecondUnitOfMeasurment: 'Əd',
      Unit1: 1,
      Unit2: 1,
      createdAt: '2023-03-03T18:38:06.223Z',
      updatedAt: '2023-03-03T18:38:06.223Z',
      __v: 0
    },
    {
      _id: 'new ObjectId("64023d776999bf8b30128662")',
      ProductName: 'eqweqwew',
      CompanyName: 'qewqeqwe',
      NumberOfProducts: 213,
      PurchasePrice: 12321,
      SellingPrice: 3321321,
      QRcode: [ '31231231' ],
      MainCode: 31231231,
      Link: 'eqweqwew_31231231.png',
      UnitOfMeasurment: 'Əd',
      SecondUnitOfMeasurment: 'Əd',
      Unit1: 1,
      Unit2: 1,
      createdAt: '2023-03-03T18:33:27.830Z',
      updatedAt: '2023-03-03T18:33:27.830Z',
      __v: 0
    },
    {
      _id: 'new ObjectId("64023d756999bf8b30128660")',
      ProductName: 'eqweqwew',
      CompanyName: 'qewqeqwe',
      NumberOfProducts: 213,
      PurchasePrice: 12321,
      SellingPrice: 3321321,
      QRcode: [ '31231231' ],
      MainCode: 31231231,
      Link: 'eqweqwew_31231231.png',
      UnitOfMeasurment: 'Əd',
      SecondUnitOfMeasurment: 'Əd',
      Unit1: 1,
      Unit2: 1,
      createdAt: '2023-03-03T18:33:25.979Z',
      updatedAt: '2023-03-03T18:33:25.979Z',
      __v: 0
    },
    {
      _id: 'new ObjectId("64023d4629db1fae20f3a26a")',
      ProductName: 'qaqaqaaaaaaaaaa',
      CompanyName: 'dqwwqdqwdqw',
      NumberOfProducts: 13,
      PurchasePrice: 123,
      SellingPrice: 3213,
      QRcode: [ '31232131,123,12312312,312,12,1' ],
      MainCode: 31232131,
      Link: 'qaqaqaaaaaaaaaa_31232131.png',
      UnitOfMeasurment: 'Əd',
      SecondUnitOfMeasurment: 'Əd',
      Unit1: 1,
      Unit2: 1,
      createdAt: '2023-03-03T18:32:38.168Z',
      updatedAt: '2023-03-03T18:32:38.168Z',
      __v: 0
    },
    {
      _id: 'new ObjectId("64023d3c29db1fae20f3a268")',
      ProductName: 'dqwdqw',
      CompanyName: 'dqwwqdqwdqw',
      NumberOfProducts: 13,
      PurchasePrice: 123,
      SellingPrice: 3213,
      QRcode: [ '31232131,123,12312312,312,12,1' ],
      MainCode: 31232131,
      Link: 'dqwdqw_31232131.png',
      UnitOfMeasurment: 'Əd',
      SecondUnitOfMeasurment: 'Əd',
      Unit1: 1,
      Unit2: 1,
      createdAt: '2023-03-03T18:32:28.957Z',
      updatedAt: '2023-03-03T18:32:28.957Z',
      __v: 0
    },
    {
      _id: 'new ObjectId("64023cfef2f26b4d627e2c9d")',
      ProductName: 'hambalbled',
      CompanyName: 'dasdsada',
      NumberOfProducts: 12,
      PurchasePrice: 12,
      SellingPrice: 18,
      QRcode: [ '458416496,681,1986165161616531' ],
      MainCode: 458416496,
      Link: 'hambalbled_458416496.png',
      UnitOfMeasurment: 'Qutu',
      SecondUnitOfMeasurment: 'Əd',
      Unit1: 1,
      Unit2: 6,
      createdAt: '2023-03-03T18:31:26.078Z',
      updatedAt: '2023-03-03T18:31:26.078Z',
      __v: 0
    }
  ]
  