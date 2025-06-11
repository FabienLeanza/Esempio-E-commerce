// Array di oggetti (libri)
const libri = [
  {
    id: 1,
    titolo: "Ventimila Leghe Sotto i Mari",
    autore: "Jules Verne",
    anno: 1870,
    prezzo: 169.9,
    immagine: "assets/verne.webp",
    inStock: true,
  },
  {
    id: 2,
    titolo: "Frankenstein",
    autore: "Mary Shelley",
    anno: 1818,
    prezzo: 114.9,
    immagine: "assets/frankenstein.webp",
    inStock: true,
  },
  {
    id: 3,
    titolo: "Alice nel paese delle meraviglie",
    autore: "Lewis Carroll",
    prezzo: 99.9,
    anno: 1951,
    immagine: "assets/alice.webp",
    inStock: false,
  },
  {
    id: 4,
    titolo: "Dracula",
    autore: "Bram Stocker",
    prezzo: 134.9,
    immagine: "assets/dracula.webp",
    inStock: true,
  },
  {
    id: 5,
    titolo: "La Divina Commedia",
    autore: "Dante Alighieri",
    prezzo: 249.9,
    immagine: "assets/commedia.webp",
    inStock: true,
  },
  {
    id: 6,
    titolo: "Il Signore degli Anelli",
    autore: "J.R.R. Tolkien",
    prezzo: 329.9,
    immagine: "assets/rings.webp",
    inStock: true,
  },
];
// Variabili globali
let carrello = [];
const prodottiContainer = document.getElementById("products-container");
const cartItemsContainer = document.getElementById("cart-items");
const totalPriceElement = document.getElementById("total-price");

// Mostra i prodotti nella griglia
function mostraProdotti() {
  prodottiContainer.innerHTML = "";
  libri.forEach((libro) => {
    const libroHTML = `
      <div class="product-card" data-id="${libro.id}">
        <img src="${libro.immagine}" alt="${libro.titolo}">
        <h3>${libro.titolo}</h3>
        <p>${libro.autore}</p>
        <p>${libro.anno}</p>
        <p class="price">${libro.prezzo.toFixed(2)} €</p>
        <button onclick="aggiungiAlCarrello(${libro.id})" ${
      !libro.inStock ? "disabled" : ""
    }>
          ${libro.inStock ? "Aggiungi al carrello" : "Esaurito"}
        </button>
      </div>
    `;
    prodottiContainer.innerHTML += libroHTML;
  });
}

mostraProdotti();
