const API = 'http://localhost:3000/api';

function getUser() { const u = localStorage.getItem('user'); return u ? JSON.parse(u) : null; }

function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2500);
}

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('localCart') || '[]');
  const el = document.getElementById('cartCount');
  if (el) el.textContent = cart.reduce((sum, i) => sum + i.quantity, 0);
}

function updateNavbar() {
  const user = getUser();
  const nav = document.getElementById('navAccount');
  if (user && nav) {
    nav.querySelector('.nav-line1').textContent = `Hello, ${user.name.split(' ')[0]}`;
    nav.href = '#';
    nav.onclick = () => {
      if (confirm('Sign out?')) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        location.reload();
      }
    };
  }
  updateCartCount();
}

function updateQuantity(productId, newQty) {
  let cart = JSON.parse(localStorage.getItem('localCart') || '[]');
  if (newQty <= 0) {
    cart = cart.filter(i => i.productId !== productId);
  } else {
    const item = cart.find(i => i.productId === productId);
    if (item) item.quantity = newQty;
  }
  localStorage.setItem('localCart', JSON.stringify(cart));
  loadCart();
}

function removeItem(productId) {
  let cart = JSON.parse(localStorage.getItem('localCart') || '[]');
  cart = cart.filter(i => i.productId !== productId);
  localStorage.setItem('localCart', JSON.stringify(cart));
  showToast('Item removed');
  loadCart();
}

async function loadCart() {
  const cart = JSON.parse(localStorage.getItem('localCart') || '[]');
  const container = document.getElementById('cartItems');
  const summary = document.getElementById('cartSummary');

  if (cart.length === 0) {
    container.innerHTML = `
      <div class="cart-empty">
        <h2>Your Amazon Clone Cart is empty</h2>
        <p><a href="index.html">Continue shopping</a></p>
      </div>
    `;
    summary.innerHTML = `
      <h3>Order Summary</h3>
      <div class="subtotal">Subtotal (0 items): <span>$0.00</span></div>
      <button class="btn-checkout" disabled>Proceed to Checkout</button>
    `;
    updateCartCount();
    return;
  }

  try {
    // Fetch all products to get details
    const res = await fetch(`${API}/products`);
    const data = await res.json();
    const allProducts = data.products;

    let subtotal = 0;
    let totalItems = 0;

    const itemsHTML = cart.map(cartItem => {
      const p = allProducts.find(prod => prod.id === cartItem.productId);
      if (!p) return '';

      const itemTotal = p.price * cartItem.quantity;
      subtotal += itemTotal;
      totalItems += cartItem.quantity;

      let qtyOptions = '';
      for (let i = 1; i <= 10; i++) {
        qtyOptions += `<option value="${i}" ${i === cartItem.quantity ? 'selected' : ''}>Qty: ${i}</option>`;
      }

      return `
        <div class="cart-item">
          <img src="${p.image}" alt="${p.title}" onclick="location.href='product.html?id=${p.id}'">
          <div class="cart-item-info">
            <div class="cart-item-title" onclick="location.href='product.html?id=${p.id}'">${p.title}</div>
            <div class="cart-item-stock">${p.inStock ? 'In Stock' : 'Out of Stock'}</div>
            <div class="cart-item-actions">
              <select onchange="updateQuantity(${p.id}, parseInt(this.value))">${qtyOptions}</select>
              <span>|</span>
              <button class="delete-btn" onclick="removeItem(${p.id})">Delete</button>
            </div>
          </div>
          <div class="cart-item-price">$${itemTotal.toFixed(2)}</div>
        </div>
      `;
    }).join('');

    container.innerHTML = `<h1>Shopping Cart</h1>${itemsHTML}`;

    summary.innerHTML = `
      <h3>Order Summary</h3>
      <div class="subtotal">Subtotal (${totalItems} item${totalItems !== 1 ? 's' : ''}): <span>$${subtotal.toFixed(2)}</span></div>
      <button class="btn-checkout" onclick="alert('Checkout coming soon!')">Proceed to Checkout</button>
    `;

    updateCartCount();
  } catch (err) {
    container.innerHTML = `
      <h1>Shopping Cart</h1>
      <div class="loading">Failed to load cart. Is the server running?</div>
    `;
  }
}

// Search handler
document.getElementById('searchForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const query = document.getElementById('searchInput').value.trim();
  const category = document.getElementById('searchCategory').value;
  let url = 'index.html?';
  if (query) url += `search=${encodeURIComponent(query)}&`;
  if (category) url += `category=${encodeURIComponent(category)}&`;
  location.href = url;
});

document.addEventListener('DOMContentLoaded', () => {
  updateNavbar();
  loadCart();
});
