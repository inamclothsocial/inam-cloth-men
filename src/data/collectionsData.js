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
  {
    id: 13,
    name: 'Instagram Sale',
    image: 'https://inamcloth.com/cdn/shop/files/inlays-minlah-collection.png?v=1732879262&width=540',
    count: '20+ Designs',
  },
  {
    id: 14,
    name: 'Chiffon',
    slug: 'chiffon',
    collectionGid: 'gid://shopify/Collection/490773414039',
    collectionHandle: 'georgette-unstitched-copy',
    image: 'https://cdn.shopify.com/s/files/1/0665/9784/7191/files/EFBBA298-F06A-481A-A50B-2CA7E40FC14D.jpg?v=1786719805',
    count: 'Live Collection',
  },
  {
    id: 15,
    name: 'Cotton Dupatta Suits',
    slug: 'cotton-dupatta-suits',
    collectionGid: 'gid://shopify/Collection/490763976855',
    collectionHandle: 'cotton-dupatta-suits',
    image: 'https://inamcloth.com/cdn/shop/files/inlays-minlah-collection.png?v=1732879262&width=540',
    count: 'Live Collection',
  },
  {
    id: 16,
    name: 'Farshi',
    slug: 'farshi',
    collectionGid: 'gid://shopify/Collection/490775478423',
    collectionHandle: 'premium-chikankari-copy',
    image: 'https://cdn.shopify.com/s/files/1/0665/9784/7191/files/E9BF7BEB-E2B6-4DE6-9606-1F2AF0460C13.jpg?v=1792147443',
    count: 'Live Collection',
  },
  {
    id: 17,
    name: 'Rayon',
    slug: 'rayon',
    collectionGid: 'gid://shopify/Collection/490934763671',
    collectionHandle: 'rayon',
    image: 'https://cdn.shopify.com/s/files/1/0665/9784/7191/files/IMG-6505.jpg?v=1793085599',
    count: 'Live Collection',
  },
  {
    id: 18,
    name: 'Handwork Stitched',
    slug: 'handwork',
    collectionGid: 'gid://shopify/Collection/490775609495',
    collectionHandle: 'farshi-copy',
    image: 'https://cdn.shopify.com/s/files/1/0665/9784/7191/files/IMG_4295.jpg?v=1793441545',
    count: 'Live Collection',
  },
  {
    id: 19,
    name: 'Premium Chikankari',
    slug: 'premium-chikankari',
    collectionHandle: 'premium-chikankari',
    image: 'https://inamcloth.com/cdn/shop/files/inlays-minlah-collection.png?v=1732879262&width=540',
    count: 'Live Collection',
  },
  {
    id: 20,
    name: 'Hijabs',
    slug: 'hijabs',
    collectionGid: 'gid://shopify/Collection/490776526999',
    collectionHandle: 'poncho-copy',
    image: 'https://inamcloth.com/cdn/shop/files/inlays-minlah-collection.png?v=1732879262&width=540',
    count: 'Live Collection',
  },
  {
    id: 21,
    name: 'Stole',
    slug: 'stole',
    collectionGid: 'gid://shopify/Collection/490776625303',
    collectionHandle: 'hijabs-copy',
    image: 'https://inamcloth.com/cdn/shop/files/inlays-minlah-collection.png?v=1732879262&width=540',
    count: 'Live Collection',
  },
  {
    id: 22,
    name: 'Shawl',
    slug: 'shawl',
    collectionGid: 'gid://shopify/Collection/490776690839',
    collectionHandle: 'stole-copy',
    image: 'https://inamcloth.com/cdn/shop/files/inlays-minlah-collection.png?v=1732879262&width=540',
    count: 'Live Collection',
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
