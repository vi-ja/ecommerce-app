const routes = {
  '/': 'home',
  '/products': 'products',
  '/product': 'product',
  '/cart': 'cart',
  '/about': 'about',
  '/contact': 'contact'
};

function getBasePath() {
  const pathname = window.location.pathname || '/';
  const segments = pathname.split('/').filter(Boolean);
  const knownRoutes = new Set(['products', 'product', 'cart', 'about', 'contact']);

  if (segments.length > 1 || (segments.length === 1 && !knownRoutes.has(segments[0]))) {
    return `/${segments[0]}`;
  }

  return '';
}

function normalizePath(path) {
  const [pathPart, ...queryParts] = path.split('?');
  const trimmedPath = pathPart === '/' ? '/' : pathPart.replace(/\/$/, '');
  const basePath = getBasePath();
  const withBase = !basePath ? trimmedPath : `${basePath}${trimmedPath === '/' ? '' : trimmedPath}`;
  const query = queryParts.length ? `?${queryParts.join('?')}` : '';
  return `${withBase}${query}`;
}

function getPathname() {
  const pathname = window.location.pathname || '/';
  const basePath = getBasePath();

  if (!basePath) return pathname;
  return pathname.startsWith(basePath) ? pathname.slice(basePath.length) || '/' : pathname;
}

export function navigate(path) {
  const normalized = normalizePath(path);
  window.history.pushState({}, '', normalized);
  renderRoute();
}

export function renderRoute() {
  const pathname = getPathname();
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

function handleInitialRoute() {
  const params = new URLSearchParams(window.location.search);
  const redirectedPath = params.get('p');

  if (redirectedPath) {
    window.history.replaceState({}, '', normalizePath(decodeURIComponent(redirectedPath)));
  }

  renderRoute();
}

window.addEventListener('DOMContentLoaded', handleInitialRoute);
window.addEventListener('popstate', renderRoute);
