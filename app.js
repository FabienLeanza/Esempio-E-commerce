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
    titolo: "Alice nel Paese delle Meraviglie",
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
    anno: 1897,
    prezzo: 134.9,
    immagine: "assets/dracula.webp",
    inStock: true,
  },
  {
    id: 5,
    titolo: "La Divina Commedia",
    autore: "Dante Alighieri",
    anno: 1305,
    prezzo: 249.9,
    immagine: "assets/commedia.webp",
    inStock: true,
  },
  {
    id: 6,
    titolo: "Il Signore degli Anelli",
    autore: "J.R.R. Tolkien",
    anno: 1954,
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
  prodottiContainer.innerHTML = "Le imperdibili occasioni di Giugno 2025";
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

// AGGIUNGI UN LIBRO AL CARRELLO
function aggiungiAlCarrello(id) {
  const libro = libri.find((l) => l.id === id);
  if (!libro) return;

  const libroNelCarrello = carrello.find((item) => item.id === id);

  if (libroNelCarrello) {
    libroNelCarrello.quantita += 1;
  } else {
    carrello.push({
      ...libro,
      quantita: 1,
    });
  }

  aggiornaCarrello();
}

// Aggiorna la visualizzazione del carrello
function aggiornaCarrello() {
  cartItemsContainer.innerHTML = "";
  let totale = 0;

  if (carrello.length === 0) {
    cartItemsContainer.innerHTML = "<p>Il carrello è vuoto</p>";
    totalPriceElement.textContent = `Totale: 0.00 €`;
    return;
  }

  carrello.forEach((libro) => {
    const subtotale = libro.prezzo * libro.quantita;
    const itemHTML = `
      <div class="cart-item">
        <span>${libro.titolo}</span>
        <div class="cart-item-controls">
          <button onclick="modificaQuantita(${libro.id}, -1)">-</button>
          <span>${libro.quantita}</span>
          <button onclick="modificaQuantita(${libro.id}, 1)">+</button>
        </div>
        <span>${subtotale.toFixed(2)} €</span>
        <button onclick="rimuoviDalCarrello(${libro.id})">Rimuovi</button>
      </div>
    `;
    cartItemsContainer.innerHTML += itemHTML;
    totale += subtotale;
  });

  totalPriceElement.textContent = `Totale: ${totale.toFixed(2)} €`;
}

// Modificare la quantità
function modificaQuantita(id, delta) {
  const libroNelCarrello = carrello.find((item) => item.id === id);
  if (!libroNelCarrello) return;

  libroNelCarrello.quantita += delta;

  if (libroNelCarrello.quantita <= 0) {
    rimuoviDalCarrello(id);
  } else {
    aggiornaCarrello();
  }
}

// Rimuovi un libro dal carrello
function rimuoviDalCarrello(id) {
  carrello = carrello.filter((l) => l.id !== id);
  aggiornaCarrello();
}
