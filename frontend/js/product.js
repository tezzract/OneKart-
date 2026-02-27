const API = 'http://localhost:3000/api';

function getToken() { return localStorage.getItem('token'); }
function getUser() { const u = localStorage.getItem('user'); return u ? JSON.parse(u) : null; }

function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2500);
}

function renderStars(rating) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(empty);
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

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('localCart') || '[]');
  const el = document.getElementById('cartCount');
  if (el) el.textContent = cart.reduce((sum, i) => sum + i.quantity, 0);
}

function addToLocalCart(productId, qty = 1) {
  let cart = JSON.parse(localStorage.getItem('localCart') || '[]');
  const existing = cart.find(i => i.productId === productId);
  if (existing) {
    existing.quantity += qty;
  } else {
    cart.push({ productId, quantity: qty });
  }
  localStorage.setItem('localCart', JSON.stringify(cart));
  updateCartCount();
  showToast('Added to cart!');
}

async function loadProduct() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  if (!id) {
    document.getElementById('productDetail').innerHTML = '<div class="loading">Product not found.</div>';
    return;
  }

  try {
    const res = await fetch(`${API}/products/${id}`);
    if (!res.ok) throw new Error('Product not found');
    const p = await res.json();

    document.title = `${p.title} - Amazon Clone`;
    const discount = Math.round((1 - p.price / p.originalPrice) * 100);

    // Quantity options
    let qtyOptions = '';
    for (let i = 1; i <= 10; i++) {
      qtyOptions += `<option value="${i}">Qty: ${i}</option>`;
    }

    document.getElementById('productDetail').innerHTML = `
      <div class="product-image">
        <img src="${p.image}" alt="${p.title}">
      </div>
      <div class="product-info">
        <h1>${p.title}</h1>
        <div class="detail-rating">
          <span class="stars">${renderStars(p.rating)}</span>
          <span>${p.rating}</span>
          <a href="#">${p.reviews.toLocaleString()} ratings</a>
        </div>
        <div class="detail-price-box">
          ${discount > 0 ? `<span class="detail-discount">-${discount}%</span>` : ''}
          <span class="detail-price">$${p.price.toFixed(2)}</span>
          ${discount > 0 ? `<div><span class="detail-original-price">List Price: $${p.originalPrice.toFixed(2)}</span></div>` : ''}
        </div>
        ${p.prime ? '<div style="margin:8px 0;font-size:14px;"><strong style="color:#00485e;">prime</strong> FREE delivery</div>' : ''}
        <div class="product-description">
          <h3>About this item</h3>
          <p>${p.description}</p>
        </div>
      </div>
      <div class="buy-box">
        <div class="buy-price">$${p.price.toFixed(2)}</div>
        <div class="${p.inStock ? 'in-stock' : 'out-of-stock'}">${p.inStock ? 'In Stock' : 'Out of Stock'}</div>
        ${p.inStock ? `
          <select class="qty-select" id="qtySelect">${qtyOptions}</select>
          <button class="btn-add-cart" onclick="addToLocalCart(${p.id}, parseInt(document.getElementById('qtySelect').value))">Add to Cart</button>
          <button class="btn-buy-now" onclick="addToLocalCart(${p.id}, parseInt(document.getElementById('qtySelect').value)); location.href='cart.html'">Buy Now</button>
        ` : ''}
        <div style="margin-top:12px; font-size:12px; color:#565959;">
          <div>Ships from: Amazon Clone</div>
          <div>Sold by: Amazon Clone</div>
        </div>
      </div>
    `;
  } catch (err) {
    document.getElementById('productDetail').innerHTML = '<div class="loading">Product not found.</div>';
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
  loadProduct();
});
