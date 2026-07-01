import { getProductById } from '../api.js';
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

export function renderProduct(app, id) {
  const product = getProductById(id);
  if (!product) {
    app.innerHTML = '<div class="empty-state">The requested product could not be found.</div>';
    return;
  }

  app.innerHTML = `
    <section class="detail-grid">
      <div class="detail-card">
        <img src="${product.image}" alt="${product.name}" />
      </div>
      <div class="detail-card">
        <p class="eyebrow">${product.category}</p>
        <h1>${product.name}</h1>
        <p>${product.description}</p>
        <div class="price">$${product.price}</div>
        <p>⭐ ${product.rating} / 5 from verified shoppers</p>
        <div class="button-row">
          <button class="btn btn-primary add-to-cart" data-id="${product.id}">Add to cart</button>
          <button class="btn btn-secondary" data-action="back">Back to catalog</button>
        </div>
      </div>
    </section>
  `;

  app.querySelector('.add-to-cart').addEventListener('click', () => {
    addToCart(product.id);
    showToast('Added to cart');
  });

  app.querySelector('[data-action="back"]').addEventListener('click', () => {
    navigate('/products');
  });
}
