// --- BOOK DATA ---
// --- BOOK DATA ---
// Mark books as featured: true (for homepage), false (for Books page)
const books = [
  { id: 1, title: "Can We be Strangers Again", author: "Shrijeet Shandilya", price: 199, image: "images/book1.png", featured: true },
  { id: 2, title: "Focus on What Matters", author: "Darius Foroux", price: 174, image: "images/book2.png", featured: true },
  { id: 3, title: "We were never meant to be", author: "Palle Vasu", price: 220, image: "images/book3.png", featured: false },
  { id: 4, title: "The Housemaid", author: "Fredia Mc Fadden", price: 180, image: "images/book4.png", featured: false },
  { id: 5, title: "The Anxious Generation", author: "Jonathan Haidt", price: 150, image: "images/book5.png", featured: false },
  { id: 6, title: "The Forty Rules of Love", author: "Elif Shafak", price: 200, image: "images/book6.png", featured: false },
  { id: 7, title: "The power of your subconscious mind", author: "Joseph murphy", price: 250, image: "images/book7.png", featured: false },
  { id: 8, title: "You only live once", author: "Stuti changle", price: 175, image: "images/book8.png", featured: false },
  { id: 9, title: "Days at Morisaki Bookshop", author: "Satoshi yagesawa", price: 210, image: "images/book9.png", featured: false },
  { id: 10, title: "The Enemy", author: "Sarah Adams", price: 230, image: "images/book10.png", featured: false },
  { id: 11, title: "Never lie", author: "Fredia McFadden", price: 120, image: "images/book11.png", featured: false },
  { id: 12, title: "Don't Believe Everything you think", author: "Joseph Nguyen", price: 260, image: "images/book12.png", featured: false }
];


let cart = JSON.parse(localStorage.getItem("cart")) || [];

// --- UPDATE CART COUNT ---
function updateCartCount() {
  document.querySelectorAll("#cart-count").forEach(el => {
    el.textContent = cart.length;
  });
}

// --- RENDER BOOKS ---
function renderBooks(containerId, booksArray) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = "";

  booksArray.forEach(book => {
    const div = document.createElement("div");
    div.className = "book-card";
    div.innerHTML = `
      <img src="${book.image}" alt="${book.title}">
      <div class="book-info">
        <h4>${book.title}</h4>
        <p>by ${book.author}</p>
        <p class="price">₹${book.price}</p>
        <button onclick="addToCart(${book.id})">Add to Cart</button>
      </div>
    `;
    container.appendChild(div);
  });
}

// --- ADD TO CART ---
function addToCart(id) {
  const book = books.find(b => b.id === id);
  const existing = cart.find(item => item.id === id);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...book, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  alert(`${book.title} added to cart!`);
}

// --- RENDER CART ---
function renderCart() {
  const container = document.getElementById("cart-items");
  if (!container) return;

  container.innerHTML = "";
  let total = 0;

  cart.forEach(book => {
    const itemTotal = book.price * book.quantity;
    total += itemTotal;

    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <img src="${book.image}" alt="${book.title}">
      <div class="cart-item-details">
        <h4>${book.title}</h4>
        <p>Price: ₹${book.price}</p>
        <div class="cart-qty">
          <button onclick="changeQty(${book.id}, -1)">-</button>
          <span>${book.quantity}</span>
          <button onclick="changeQty(${book.id}, 1)">+</button>
        </div>
      </div>
      <p style="color:#ffd700;">₹${itemTotal}</p>
    `;
    container.appendChild(div);
  });

  const totalEl = document.getElementById("total");
  if (totalEl) totalEl.textContent = total;
}

// --- CHANGE QUANTITY ---
function changeQty(id, change) {
  const item = cart.find(b => b.id === id);
  if (!item) return;

  item.quantity += change;
  if (item.quantity <= 0) {
    cart = cart.filter(b => b.id !== id);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
  updateCartCount();
}


// --- INITIALIZE ---
updateCartCount();

// Select first 5 books as featured
const featuredBooks = books.slice(0, 5);

// Render 5 books on home page
renderBooks("featured-books", featuredBooks);

// Render all books on Books page
renderBooks("books-container", books);

renderCart();
