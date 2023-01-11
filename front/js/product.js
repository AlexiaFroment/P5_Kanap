//* VARIABLES
let products = [];

//* URL WITH ID VARIABLE - VARIABLES
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get("id");

//* INNERHTML/TEXTCONTENT
const itemImg = document.querySelector(".item__img");

//* GET DATA => METHODE FETCH
async function fetchData() {
  await fetch(`http://localhost:3000/api/products/${id}`)
    .then((res) => res.json())
    .then((data) => (products = data))
    .catch((err)=>console.log(err));
};

//* DISPLAY PRODUCTS AND FEATURES
async function fetchDisplay() {
  await fetchData();
  //IMG NAME PRICE DESCRIPTION PRODUCT
  itemImg.innerHTML = ` <img src=${products.imageUrl} alt=${products.altTxt}>`;
  title.textContent = `${products.name}`;
  price.textContent = `${products.price}`;
  description.textContent = `${products.description}`;
  //COLOR OPTION PRODUCT
  products.colors.forEach(function (color) {
    let option = document.createElement("option");
    option.textContent += `${color}`;
    option.value = `${color}`;
    colors.appendChild(option);
  });
}
fetchDisplay();

//* ADD ITEMS IN THE BASKET => ADDEVENTLISTENER
addToCart.addEventListener("mousedown", () => {
  // VALUE - GET ID QTY COLOR => AND SAVE VALUES
  let id = products._id;
  let qty = parseInt(quantity.value);
  let color = document.getElementById("colors").value;
  const data = {
    _id: id,
    quantity: qty,
    color,
  };
  // CHECK QTY AND COLOR => ADDBASKET
  if (color == null || color === "" || quantity.value <= 0) {
    alert("Vous devez sélectionner une couleur et une quantité");
  } else {
    addBasket(data);
  }
  // STYLE BTN DOWN
  addToCart.style.fontWeight = `bold`;
  addToCart.style.backgroundColor = `#3f6993`;
  addToCart.style.transform = `translate(10%)`;
});

// VALUE AND NEW STYLE OF BTN UP  
addToCart.addEventListener("mouseup", () => {
  //VALUE
  const colorValue = document.querySelector("#colors");
  colorValue.value = "";
  const qtyValue = document.querySelector("#quantity");
  qtyValue.value = "0";
  //BTN
  addToCart.style.fontWeight = ``;
  addToCart.style.backgroundColor = ``;
});
