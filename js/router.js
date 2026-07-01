const routes = {
  '/': 'home',
  '/products': 'products',
  '/product': 'product',
  '/cart': 'cart',
  '/about': 'about',
  '/contact': 'contact'
};

export function navigate(path) {
  const normalized = path === '/' ? '/' : path.replace(/\/$/, '');
  window.history.pushState({}, '', normalized);
  renderRoute();
}

export function renderRoute() {
  const pathname = window.location.pathname || '/';
  const routeName = routes[pathname] || routes['/'];
  const app = document.getElementById('app');
  if (!app) return;

  if (routeName === 'home') {
    import('./views/home.js').then((module) => module.renderHome(app));
  } else if (routeName === 'products') {
    import('./views/products.js').then((module) => module.renderProducts(app));
  } else if (routeName === 'product') {
    const id = new URLSearchParams(window.location.search).get('id');
    import('./views/product.js').then((module) => module.renderProduct(app, id));
  } else if (routeName === 'cart') {
    import('./views/cart.js').then((module) => module.renderCart(app));
  } else if (routeName === 'about') {
    import('./views/about.js').then((module) => module.renderAbout(app));
  } else if (routeName === 'contact') {
    import('./views/contact.js').then((module) => module.renderContact(app));
  }
}

window.addEventListener('popstate', renderRoute);
