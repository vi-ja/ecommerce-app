export const products = [
  {
    id: 1,
    name: 'Nova Runner',
    category: 'Footwear',
    price: 129,
    rating: 4.8,
    description: 'Lightweight comfort for all-day city movement.',
    image: 'assets/nova-runner.svg'
  },
  {
    id: 2,
    name: 'Aural Mini',
    category: 'Audio',
    price: 89,
    rating: 4.7,
    description: 'Crisp sound packed into a compact silhouette.',
    image: 'assets/aural-mini.svg'
  },
  {
    id: 3,
    name: 'Lumen Watch',
    category: 'Accessories',
    price: 159,
    rating: 4.9,
    description: 'Minimalist frame with a bold, modern display.',
    image: 'assets/lumen-watch.svg'
  },
  {
    id: 4,
    name: 'Atlas Tote',
    category: 'Bags',
    price: 119,
    rating: 4.6,
    description: 'Structured storage for workdays and weekend escapes.',
    image: 'assets/atlas-tote.svg'
  }
];

export function getProducts() {
  return products;
}

export function getProductById(id) {
  return products.find((product) => product.id === Number(id));
}

export function getCategories() {
  return ['Footwear', 'Audio', 'Accessories', 'Bags'];
}
