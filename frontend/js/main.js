const API = 'http://localhost:3000/api';

// ===== UTILITY FUNCTIONS =====
function getToken() { return localStorage.getItem('token'); }
function getUser() { const u = localStorage.getItem('user'); return u ? JSON.parse(u) : null; }

function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2500);
}

function formatPrice(price) {
  const [dollars, cents] = price.toFixed(2).split('.');
  return `<span class="price-symbol">$</span>${dollars}<span class="price-fraction">${cents}</span>`;
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
    nav.querySelector('.nav-line2').textContent = 'Account & Lists';
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

// ===== LOAD CATEGORIES =====
async function loadCategories() {
  try {
    const res = await fetch(`${API}/products/meta/categories`);
    const categories = await res.json();

    // Sub-navbar
    const subNav = document.getElementById('subNavbar');
    categories.forEach(cat => {
      const a = document.createElement('a');
      a.href = `index.html?category=${encodeURIComponent(cat.name)}`;
      a.textContent = cat.name;
      subNav.appendChild(a);
    });

    // Search category dropdown
    const select = document.getElementById('searchCategory');
    categories.forEach(cat => {
      const opt = document.createElement('option');
      opt.value = cat.name;
      opt.textContent = cat.name;
      select.appendChild(opt);
    });

    // Category cards
    const grid = document.getElementById('categoriesGrid');
    grid.innerHTML = categories.map(cat => `
      <div class="category-card" onclick="location.href='index.html?category=${encodeURIComponent(cat.name)}'">
        <h3>${cat.name}</h3>
        <img src="${cat.image}" alt="${cat.name}">
        <span class="see-more">See more</span>
      </div>
    `).join('');
  } catch (err) {
    console.error('Failed to load categories:', err);
  }
}

// ===== LOAD PRODUCTS =====
async function loadProducts() {
  try {
    const params = new URLSearchParams(window.location.search);
    const category = params.get('category');
    const search = params.get('search');
    const sort = params.get('sort');

    let url = `${API}/products?`;
    if (category) url += `category=${encodeURIComponent(category)}&`;
    if (search) url += `search=${encodeURIComponent(search)}&`;
    if (sort) url += `sort=${sort}&`;

    const res = await fetch(url);
    const data = await res.json();

    const grid = document.getElementById('productsGrid');
    const title = document.querySelector('.products-section .section-title');

    if (category) title.textContent = category;
    else if (search) title.textContent = `Results for "${search}"`;
    else title.textContent = 'Featured Products';

    if (data.products.length === 0) {
      grid.innerHTML = '<div class="loading">No products found.</div>';
      return;
    }

    grid.innerHTML = data.products.map(p => {
      const discount = Math.round((1 - p.price / p.originalPrice) * 100);
      return `
        <div class="product-card">
          ${p.prime ? '<span class="badge-prime">PRIME</span>' : ''}
          <img src="${p.image}" alt="${p.title}" onclick="location.href='product.html?id=${p.id}'">
          <div class="product-title" onclick="location.href='product.html?id=${p.id}'">${p.title}</div>
          <div class="product-rating">
            <span class="stars">${renderStars(p.rating)}</span>
            <span class="review-count">${p.reviews.toLocaleString()}</span>
          </div>
          <div class="product-price">${formatPrice(p.price)}</div>
          ${discount > 0 ? `
            <div>
              <span class="discount">-${discount}%</span>
              <span class="original-price">$${p.originalPrice.toFixed(2)}</span>
            </div>
          ` : ''}
          ${p.prime ? '<div class="delivery-info">FREE delivery with Prime</div>' : '<div class="delivery-info">FREE delivery on orders over $25</div>'}
        </div>
      `;
    }).join('');
  } catch (err) {
    console.error('Failed to load products:', err);
    document.getElementById('productsGrid').innerHTML = '<div class="loading">Failed to load products. Is the server running?</div>';
  }
}

// ===== SEARCH =====
document.getElementById('searchForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const query = document.getElementById('searchInput').value.trim();
  const category = document.getElementById('searchCategory').value;
  let url = 'index.html?';
  if (query) url += `search=${encodeURIComponent(query)}&`;
  if (category) url += `category=${encodeURIComponent(category)}&`;
  location.href = url;
});

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  updateNavbar();
  loadCategories();
  loadProducts();

  // Hide hero/categories if searching or filtering
  const params = new URLSearchParams(window.location.search);
  if (params.get('category') || params.get('search')) {
    const hero = document.querySelector('.hero');
    const catTitle = document.querySelector('.section-title');
    const catGrid = document.getElementById('categoriesGrid');
    if (hero) hero.classList.add('hidden');
    if (catTitle) catTitle.classList.add('hidden');
    if (catGrid) catGrid.classList.add('hidden');
  }
});
