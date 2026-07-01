import { renderRoute, navigate } from './router.js';
import { renderCartCount } from './cart.js';

function bindNavigation() {
  document.addEventListener('click', (event) => {
    const link = event.target.closest('a[data-route]');
    if (!link) return;
    event.preventDefault();
    navigate(link.getAttribute('data-route'));
    updateActiveLink(link.getAttribute('data-route'));
  });
}

function updateActiveLink(path) {
  document.querySelectorAll('a[data-route]').forEach((link) => {
    const isActive = link.getAttribute('data-route') === path;
    link.classList.toggle('active', isActive);
  });
}

window.addEventListener('DOMContentLoaded', () => {
  bindNavigation();
  renderCartCount();
  renderRoute();
  updateActiveLink(window.location.pathname || '/');
});

window.addEventListener('resize', () => {
  document.documentElement.style.setProperty('--hero-columns', window.innerWidth < 920 ? '1fr' : '30% 40% 30%');
});
