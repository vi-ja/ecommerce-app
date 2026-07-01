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

export function renderHome(app) {
  const products = getProducts().slice(0, 4);
  const categories = getCategories();
  app.innerHTML = `
    <section class="hero-section" aria-labelledby="hero-title">
      <div class="hero-copy">
        <p class="eyebrow">Curated essentials</p>
        <h1 id="hero-title">Discover pieces that move with your day.</h1>
        <p>Premium catalog experience with thoughtful styling, flexible filters, and effortless checkout.</p>
        <div class="button-row">
          <a class="btn btn-primary" href="/products" data-route="/products">Browse Products</a>
          <a class="btn btn-secondary" href="/about" data-route="/about">Learn More</a>
        </div>
      </div>
      <div class="hero-side-card">
        <div class="hero-badge">New season</div>
        <img src="assets/nova-runner.svg" alt="Featured product hero" />
      </div>
      <div class="hero-stats" aria-label="Highlights">
        <div>
          <strong>4.9/5</strong>
          <span>Rated picks</span>
        </div>
        <div>
          <strong>Free</strong>
          <span>Shipping</span>
        </div>
        <div>
          <strong>24/7</strong>
          <span>Support</span>
        </div>
      </div>
    </section>

    <section>
      <div class="section-heading">
        <h2>Shop by category</h2>
      </div>
      <div class="category-grid">
        ${categories.map((category) => `
          <article class="category-card">
            <h3>${category}</h3>
            <p>Expertly selected staples for modern routines.</p>
          </article>`).join('')}
      </div>
    </section>

    <section>
      <div class="section-heading">
        <h2>Featured products</h2>
        <a href="/products" data-route="/products">View all</a>
      </div>
      <div class="product-grid">
        ${products.map((product) => `
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
          </article>`).join('')}
      </div>
    </section>
  `;

  app.querySelectorAll('.add-to-cart').forEach((button) => {
    button.addEventListener('click', () => {
      addToCart(Number(button.dataset.id));
      showToast('Added to cart');
    });
  });

  app.querySelectorAll('.view-product').forEach((button) => {
    button.addEventListener('click', () => {
      navigate(`/product?id=${button.dataset.id}`);
    });
  });
}
