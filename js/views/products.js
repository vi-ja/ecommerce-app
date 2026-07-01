import { getProducts, getCategories } from '../api.js';
import { addToCart } from '../cart.js';
import { navigate } from '../router.js';

function showToast(message) {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 1600);
}

export function renderProducts(app) {
  const products = getProducts();
  const categories = getCategories();
  app.innerHTML = `
    <section>
      <div class="section-heading">
        <h2>Product catalog</h2>
        <span>Search, filter, and discover the perfect pick.</span>
      </div>
      <div class="filters">
        <label>
          Search
          <input id="search" type="search" placeholder="Find a product" />
        </label>
        <label>
          Category
          <select id="category-filter">
            <option value="all">All categories</option>
            ${categories.map((category) => `<option value="${category}">${category}</option>`).join('')}
          </select>
        </label>
        <label>
          Max price
          <input id="price-filter" type="range" min="50" max="200" step="10" value="200" />
        </label>
      </div>
      <div id="product-results" class="product-grid"></div>
    </section>
  `;

  const searchInput = app.querySelector('#search');
  const categoryFilter = app.querySelector('#category-filter');
  const priceFilter = app.querySelector('#price-filter');
  const results = app.querySelector('#product-results');

  function renderFilteredProducts() {
    const query = searchInput.value.toLowerCase();
    const category = categoryFilter.value;
    const maxPrice = Number(priceFilter.value);
    const filtered = products.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(query) || product.description.toLowerCase().includes(query);
      const matchesCategory = category === 'all' || product.category === category;
      const matchesPrice = product.price <= maxPrice;
      return matchesSearch && matchesCategory && matchesPrice;
    });

    if (!filtered.length) {
      results.innerHTML = '<div class="empty-state">No products match this selection.</div>';
      return;
    }

    results.innerHTML = filtered.map((product) => `
      <article class="product-card">
        <img src="${product.image}" alt="${product.name}" />
        <div class="product-meta">
          <span>${product.category}</span>
          <span>★ ${product.rating}</span>
        </div>
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <div class="price">$${product.price}</div>
        <div class="button-row">
          <button class="btn btn-primary add-to-cart" data-id="${product.id}">Add to cart</button>
          <button class="btn btn-secondary view-product" data-id="${product.id}">Details</button>
        </div>
      </article>`).join('');

    results.querySelectorAll('.add-to-cart').forEach((button) => {
      button.addEventListener('click', () => {
        addToCart(Number(button.dataset.id));
        showToast('Added to cart');
      });
    });

    results.querySelectorAll('.view-product').forEach((button) => {
      button.addEventListener('click', () => {
        navigate(`/product?id=${button.dataset.id}`);
      });
    });
  }

  [searchInput, categoryFilter, priceFilter].forEach((element) => {
    element.addEventListener('input', renderFilteredProducts);
    element.addEventListener('change', renderFilteredProducts);
  });

  renderFilteredProducts();
}
