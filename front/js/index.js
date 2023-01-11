//* PAGE D'ACCUEIL => RECAPITULATIF DES PRODUITS DU CATALGOGUE
//* VARIABLES
const url = `http://localhost:3000/api/products/`;
let products = [];

//* GET DATA => METHODE FETCH
const fetchProduct = async () => {
  await fetch(url)
    .then((res) => res.json())
    .then((data) => (products = data))
    .catch(function(err) {alert(err)});
};

//* DISPLAY DATA 
const displayProduct = async () => {
  await fetchProduct();

  products.forEach(function (product) {
    items.innerHTML += `
  <a href="./product.html?id=${product._id}">
    <article>
    <img src=${product.imageUrl} alt=${product.altTxt},${product.name}>
    <h3 class="productName">${product.name}</h3>
    <p class="productDescription">${product.description}</p>
    </article>
  </a>
  `;
  });
};
displayProduct();

