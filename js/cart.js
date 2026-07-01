const CART_KEY = 'astracart-cart';

export function getCart() {
  const raw = localStorage.getItem(CART_KEY);
  return raw ? JSON.parse(raw) : [];
}

export function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  renderCartCount();
}

export function addToCart(productId, quantity = 1) {
  const cart = getCart();
  const existing = cart.find((item) => item.id === productId);
  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({ id: productId, quantity });
  }
  saveCart(cart);
  return cart;
}

export function removeFromCart(productId) {
  const next = getCart().filter((item) => item.id !== productId);
  saveCart(next);
  return next;
}

export function updateQuantity(productId, quantity) {
  const cart = getCart();
  const item = cart.find((entry) => entry.id === productId);
  if (!item) return cart;
  item.quantity = Math.max(1, quantity);
  saveCart(cart);
  return cart;
}

export function getCartCount() {
  return getCart().reduce((total, item) => total + item.quantity, 0);
}

export function renderCartCount() {
  const badge = document.querySelector('[data-cart-count]');
  if (badge) badge.textContent = String(getCartCount());
}
