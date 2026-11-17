export const slugify = (text) =>
  text
    .toString()
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');

export const getProductUrl = (product) => {
  if (!product) return '/shop-by-category';
  const target = product.handle || product.id || slugify(product.name || 'product');
  return `/product/${target}`;
};

export const shopByCollections = [
  {
    id: 1,
    name: 'Amarige Collection',
    image: 'https://inamcloth.com/cdn/shop/files/202_37be3c73-6f64-4756-94b0-259e7a7fa10a.jpg?v=1732738003&width=540',
    count: '24 Designs',
  },
  {
    id: 2,
    name: 'Safeera',
    image: 'https://inamcloth.com/cdn/shop/files/349.jpg?v=1732737819&width=540',
    count: '18 Designs',
  },
  {
    id: 3,
    name: 'Dilaab Collection',
    image: 'https://inamcloth.com/cdn/shop/files/dilaab-collection.png?v=1732879098&width=540',
    count: '32 Designs',
  },
  {
    id: 4,
    name: 'Flossie Collection',
    image: 'https://inamcloth.com/cdn/shop/files/flossie-collection.png?v=1732879448&width=540',
    count: '15 Designs',
  },
  {
    id: 5,
    name: 'Gelareh Collection',
    image: 'https://inamcloth.com/cdn/shop/files/141.jpg?v=1732737874&width=540',
    count: '20 Designs',
  },
  {
    id: 6,
    name: 'Goncha Collection',
    image: 'https://inamcloth.com/cdn/shop/files/goncha.jpg?v=1732879177&width=540',
    count: '28 Designs',
  },
  {
    id: 7,
    name: 'Inlays Ramsha Chiffon Collection',
    image: 'https://inamcloth.com/cdn/shop/files/inlays-collection.jpg?v=1732879215&width=540',
    count: '19 Designs',
  },
  {
    id: 8,
    name: 'Inlays Ramsha Minhal Collection',
    image: 'https://inamcloth.com/cdn/shop/files/inlays-minlah-collection.png?v=1732879262&width=540',
    count: '25 Designs',
  },
  {
    id: 9,
    name: 'Mahiye Organza Fancy Semi Stitch',
    image: 'https://inamcloth.com/cdn/shop/files/167.jpg?v=1732737745&width=540',
    count: '16 Designs',
  },
  {
    id: 10,
    name: "Noor's Aeris Exclusive Shiffon",
    image: 'https://inamcloth.com/cdn/shop/files/N9.jpg?v=1732738012&width=540',
    count: '22 Designs',
  },
  {
    id: 11,
    name: "Noor's Sajavat Luxury Shiffon Collection",
    image: 'https://inamcloth.com/cdn/shop/files/noors-sajavat.png?v=1732879407&width=540',
    count: '30 Designs',
  },
  {
    id: 12,
    name: "Noor's Surmaya Luxury Chiffon Collection",
    image: 'https://inamcloth.com/cdn/shop/files/96.jpg?v=1732737649&width=540',
    count: '27 Designs',
  },
];

export const featuredFiveCollections = shopByCollections.slice(0, 5);

export const FEATURED_COLLECTIONS = shopByCollections.map((c) => {
  const slug = slugify(c.name);
  return {
    id: c.id,
    slug,
    title: c.name,
    name: c.name,
    image: c.image,
    count: c.count,
    link: `/${slug}`,
  };
});
