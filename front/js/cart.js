//* VARIABLES
basket = getBasket();
let itemPrice = {};

//* BASKET FOREACH
basket.forEach(async (item, data) => {
  let id = item._id;

  // CONST URL API ✓ => URLID
  const url = `http://localhost:3000/api/products/`;
  const urlId = url + id;

  // GET DATA FOR EACH ITEM => FETCH URLID
  await fetch(urlId)
    .then((res) => res.json())
    .then((data) => {
      // DISPLAY BASKET
      itemPrice[id] = data.price;
      displayItems(item, data);
    })
    .catch((err) => console.log(err))

  // TOTAL PRICE
  getTotalPrice();
});

//* TOTAL QTY
getNumberItem();
