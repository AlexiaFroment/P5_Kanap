//* VERIFIER LES DONNES DE L UTILISATEUR => MISE EN PLACE DE REGEX POUR LES VERIF
//* REQUETE POST => ENVOI DES DONNES
//* MESSAGE D ERREUR A CREER

//* VARIABLES
const btnOrder = document.getElementById("order");

//* ADDEVENTLISTENER => BTN COMMANDER
btnOrder.addEventListener("click", (e) => {
  formSubmit(e);
});

//* FUNCTION TO CLIC
function formSubmit(e) {
  e.preventDefault();
  // CHECK EACH ITEM, AND DATA FORM
  if (basket.length === 0) {
    alert("Panier vide");
    return;
  }
  if (checkForm()) return;
  if (checkFirstname()) return;
  if (checkLastname()) return;
  if (checkCity()) return;
  if (checkAddress()) return;
  if (checkEmail()) return;

  //GET DATA BASKET AND FORM
  order = makeOrder();

  // METHODE FETCH POST => DATA ORDER => REDIRECT TO CONFIRM PAGE
  fetch(`http://localhost:3000/api/products/order`, {
    method: "POST",
    body: JSON.stringify(order),
    headers: {
      "Content-type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      const orderId = data.orderId;
      const urlConfirm = `./html/confirmation.html`;
      window.location = urlConfirm + `?orderId=` + orderId;
      return console.log(data);
    })
    .catch((err) => console.log(err));
}

//* DATA_________________________________________
//* GET DATA FORM
function makeOrder() {
  const form = document.querySelector(".cart__order__form");
  const firstName = form.elements.firstName.value;
  const lastName = form.elements.lastName.value;
  const address = form.elements.address.value;
  const city = form.elements.city.value;
  const email = form.elements.email.value;
  const order = {
    contact: {
      firstName,
      lastName,
      address,
      city,
      email,
    },
    products: getIdBasket(),
  };

  return order;
}

//* GET ID ITEM FOR THE DATA FORM
function getIdBasket() {
  const idBasket = [];
  basket.forEach((item) => {
    let id = item._id;
    idBasket.push(id);
  });
  return idBasket;
}

//* CHECKING______________________________________
//* CHECK FORM AND ALL VALUES ARE COMPLETED
function checkForm() {
  const inputs = document.querySelectorAll(
    'input[type="text"],input[type="email"]'
  );

  inputs.forEach((input) => {
    if (input.value == "") {
      alert("Merci de compléter l'ensemble de vos coordonnées");
      return true;
    }
    return false;
  });
}
//* CHECK FIRSTNAME LASTNAME CITY
function checkFirstname() {
  const firstName = document.getElementById("firstName").value;
  const regexFirstLastnameAndCity = /^[a-zA-Z]{3,15}$/i;
  if (regexFirstLastnameAndCity.test(firstName) === false) {
    alert("Votre prénom n'est pas valide");
    return true;
  }
  return false;
}
function checkLastname() {
  const lastName = document.getElementById("lastName").value;
  const regexFirstLastnameAndCity = /^[a-zA-Z]{3,15}$/i;

  if (regexFirstLastnameAndCity.test(lastName) === false) {
    alert("Votre nom n'est pas valide");
    return true;
  }
  return false;
}
function checkCity() {
  const city = document.getElementById("city").value;
  const regexFirstLastnameAndCity = /^[a-zA-Z]{3,15}$/i;

  if (regexFirstLastnameAndCity.test(city) === false) {
    alert("Votre ville n'est pas valide");
    return true;
  }
  return false;
}
//* CHECK ADDRESS
function checkAddress() {
  const address = document.getElementById("address").value;
  const regexAddress = /^[a-zA-Z0-9\s,.'-]{4,50}$/i;
  if (regexAddress.test(address) === false) {
    alert("Votre adresse n'est pas valide");
    return true;
  }
  return false;
}
//* CHECK EMAIL
function checkEmail() {
  const email = document.getElementById("email").value;
  const regexEmail = /^[\w_-]+@[\w-]+\.[a-z]{2,4}$/;
  if (regexEmail.test(email) === false) {
    alert("Votre email n'est pas valide");
    return true;
  }
  return false;
}
