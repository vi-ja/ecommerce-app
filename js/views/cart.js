import { addToCart, getCart, removeFromCart, updateQuantity } from '../cart.js';
import { getProductById } from '../api.js';
import { navigate } from '../router.js';

function formatCurrency(value) {
  return `$${value.toFixed(2)}`;
}

export function renderCart(app) {
  const cart = getCart();
  const items = cart.map((entry) => ({ ...entry, product: getProductById(entry.id) })).filter((entry) => entry.product);

  if (!items.length) {
    app.innerHTML = `
      <section class="empty-state">
        <h2>Your cart is empty</h2>
        <p>Pick a few favorites and check back here anytime.</p>
        <button class="btn btn-primary" data-action="browse">Browse products</button>
      </section>
    `;
    app.querySelector('[data-action="browse"]').addEventListener('click', () => navigate('/products'));
    return;
  }

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  app.innerHTML = `
    <section class="cart-list">
      <div>
        ${items.map((item) => `
          <article class="cart-item">
            <div>
              <h3>${item.product.name}</h3>
              <p>${item.product.description}</p>
              <div class="price">${formatCurrency(item.product.price * item.quantity)}</div>
            </div>
            <div class="qty-controls">
              <button data-action="decrease" data-id="${item.id}">−</button>
              <span>${item.quantity}</span>
              <button data-action="increase" data-id="${item.id}">+</button>
              <button class="pill-btn" data-action="remove" data-id="${item.id}">Remove</button>
            </div>
          </article>`).join('')}
      </div>
      <aside class="checkout-card">
        <h3>Summary</h3>
        <p>Subtotal: ${formatCurrency(subtotal)}</p>
        <p>Shipping: Free</p>
        <p><strong>Total: ${formatCurrency(subtotal)}</strong></p>
        <button class="btn btn-primary">Checkout</button>
      </aside>
    </section>
  `;

  app.querySelectorAll('[data-action="increase"]').forEach((button) => {
    button.addEventListener('click', () => {
      updateQuantity(Number(button.dataset.id), getCart().find((entry) => entry.id === Number(button.dataset.id)).quantity + 1);
      renderCart(app);
    });
  });

  app.querySelectorAll('[data-action="decrease"]').forEach((button) => {
    button.addEventListener('click', () => {
      const entry = getCart().find((item) => item.id === Number(button.dataset.id));
      if (entry.quantity <= 1) {
        removeFromCart(Number(button.dataset.id));
      } else {
        updateQuantity(Number(button.dataset.id), entry.quantity - 1);
      }
      renderCart(app);
    });
  });

  app.querySelectorAll('[data-action="remove"]').forEach((button) => {
    button.addEventListener('click', () => {
      removeFromCart(Number(button.dataset.id));
      renderCart(app);
    });
  });
}
