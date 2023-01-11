//* URL SEARCHPARAMS
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const orderId = urlParams.get("orderId");

//* DISPLAY IDORDER
const nDeCde = document.getElementById("orderId").textContent = orderId