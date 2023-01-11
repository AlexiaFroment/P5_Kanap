//*  MAPPING CREATE ITEM
function displayItems(item, data) {
  article = createArticle(item);
  imgDiv = createImg(data);
  article.appendChild(imgDiv);

  cartContent = createDescriptionSettings(item, data);
  article.appendChild(cartContent);

  displayArticle(article);
}

//* SELECT ID CART__ITEMS FOR DISPLAY ARTICLE
function displayArticle(article) {
  // HTML
  document.getElementById("cart__items").appendChild(article);
}

//* CREATE ARTICLE
function createArticle(item) {
  // HTML
  let article = document.createElement("article");
  article.classList.add("cart__item");
  article.dataset.id = `${item._id}`;
  article.dataset.color = `${item.color}`;

  return article;
}
//* CREATE IMG
function createImg(data) {
  // HTML
  let imgDiv = document.createElement("div");
  imgDiv.classList.add("cart__item__img");
  let img = document.createElement("img");
  img.src = `${data.imageUrl}`;
  img.alt = `${data.altTxt}`;

  imgDiv.appendChild(img);

  return imgDiv;
}

//* CREATE CONTENT
//* DESCRIPTION AND SETTINGS ✓
function createDescriptionSettings(item, data) {
  // HTML
  cartContent = document.createElement("div");
  cartContent.classList.add("cart__item__content");

  description = createDescription(item, data);
  settings = createSettings(item);

  cartContent.appendChild(description);
  cartContent.appendChild(settings);

  return cartContent;
}

//* DESCRIPTION ✓
function createDescription(item, data) {
  // HTML
  let description = document.createElement("div");
  description.classList.add("cart__item__content__description");

  let h2 = document.createElement("h2");
  h2.textContent = `${data.name}`;
  description.appendChild(h2);

  let p = document.createElement("p");
  p.textContent = `${item.color}`;
  description.appendChild(p);

  let p1 = document.createElement("p");
  p1.textContent = `${data.price} ` + `€`;
  description.appendChild(p1);

  return description;
}
//* SETTINGS ✓
function createSettings(item) {
  // HTML
  let settings = document.createElement("div");
  settings.classList.add("cart__item__content__settings");

  cartQty = qtySettings(item);
  cartDelete = deleteSettings(item);

  settings.appendChild(cartQty);
  settings.appendChild(cartDelete);

  return settings;
}
//* QTY SETTINGS
function qtySettings(item) {
  // HTML
  let cartQty = document.createElement("div");
  cartQty.classList.add("cart__item__content__settings__quantity");

  let p2 = document.createElement("p");
  p2.textContent = "Qté :";
  cartQty.appendChild(p2);

  let inputValue = document.createElement("input");
  inputValue.classList.add("itemQuantity");
  inputValue.type = "number";
  inputValue.min = "1";
  inputValue.max = "100";
  inputValue.value = `${item.quantity}`;
  cartQty.appendChild(inputValue);

  //CHANGE QTY => ADDEVENTLISTENER
  inputValue.addEventListener("input", () => {
    updateBasket(item._id, item.color, inputValue.value);
  });

  return cartQty;
}
//* DELETE SETTINGS
function deleteSettings(item) {
  //HTML
  let cartDelete = document.createElement("div");
  cartDelete.classList.add("cart__item__content__settings__delete");

  let p3 = document.createElement("p");
  p3.classList.add("deleteItem");
  p3.textContent = "Supprimer";
  cartDelete.appendChild(p3);

  //REMOVE ARTICLE => ADDEVENTLISTENER
  p3.addEventListener("click", () => {
    removeBasket(item);
    p3.closest(".cart__item").remove();
  });
  //FUNCTION A PLACER DANS LE BASKET UNE FOIS TERMINER ⚠️
  function removeBasket(item) {
    let basket = getBasket();
    let newBasket = basket.filter(
      (element) => element._id !== item.id && element.color !== item.color
    );
    saveBasket(newBasket);
    getNumberItem();
    getTotalPrice();
  }

  return cartDelete;
}
