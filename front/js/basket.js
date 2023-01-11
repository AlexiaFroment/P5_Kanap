//* PAGE PANIER => ACTIONS SUR LE PANIER ET SES ITEMS
//* VARIABLES
basket = getBasket();
const nberOfItems = basket.length;
const item = basket.map((item) => {
  return item;
});

//* SAVE BASKET IN LOCALSTORAGE
function saveBasket(basket) {
  localStorage.setItem("basket", JSON.stringify(basket));
}

//* GET DATA JSON
function getBasket() {
  let basket = localStorage.getItem("basket");
  if (!basket) {
    return [];
  } else {
    return JSON.parse(basket);
  }
}

//* ADD BASKET
function addBasket(item) {
  let basket = getBasket();
  let foundItem = basket.find(
    (i) => i._id == item._id && i.color == item.color
  );
  if (foundItem != undefined) {
    foundItem.quantity += item.quantity;
  } else {
    basket.push(item);
  }
  saveBasket(basket);
}

//* CHANGE QTY => ADDEVENTLISTENER INPUTVALUE MAPPING
function updateBasket(id, color, newValue) {
  let basket = getBasket();
  const updateItem = basket.find(
    (item) => item._id === id && item.color === color
  );
  updateItem.quantity = Number(newValue);
  saveBasket(basket);
  getNumberItem();
  getTotalPrice();
}

//* RETIRER DU PANIER => ADDEVENTLISTENER BTN SUPP MAPPING
function removeBasket(item) {
  let basket = getBasket();
  let newBasket = basket.filter(
    (element) => element._id !== item.id && element.color !== item.color
  );
  saveBasket(newBasket);
  getNumberItem();
  getTotalPrice();
}

//* CALCUL QTY ITEMS IN THE BASKET
function getNumberItem() {
  let basket = getBasket();
  let basketQty = basket.reduce((accumulateur, item) => {
    return accumulateur + item.quantity;
  }, 0);
  totalQuantity.textContent = basketQty;
}

//* CALCUL AMOUNT OF BASKET
function getTotalPrice() {
  let basket = getBasket();
  let basketPrice = basket.reduce((accumulateur, item) => {
    return accumulateur + itemPrice[item._id] * item.quantity;
  }, 0);
  totalPrice.textContent = basketPrice;
}
