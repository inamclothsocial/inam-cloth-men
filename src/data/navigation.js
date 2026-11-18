export const NAV_LINKS = [
  { id: 'home', label: 'Home', path: '/' },
  { id: 'new-arrivals', label: 'New Arrivals', path: '/new-arrivals' },
  {
    id: 'shop-by-category',
    label: 'Shop By Category',
    path: '/shop-by-category',
    isMegaMenu: true,
  },
  {
    id: 'stitched',
    label: 'Stitched',
    path: '/stitched',
    children: [
      { id: 'stitched-cotton-dupatta-suits', label: 'Cotton Dupatta Suits', path: '/stitched/cotton-dupatta-suits', collectionGid: 'gid://shopify/Collection/490763976855', collectionHandle: 'cotton-dupatta-suits' },
      { id: 'stitched-muslin', label: 'Muslin', path: '/stitched/muslin', collectionGid: 'gid://shopify/Collection/490764435607', collectionHandle: 'muslin' },
      { id: 'stitched-rayon', label: 'Rayon', path: '/stitched/rayon', collectionGid: 'gid://shopify/Collection/490934763671', collectionHandle: 'rayon' },
      { id: 'stitched-chanderi', label: 'Chanderi', path: '/stitched/chanderi', collectionGid: 'gid://shopify/Collection/490772856983', collectionHandle: 'chanderi' },
      { id: 'stitched-georgette', label: 'Georgette', path: '/stitched/georgette', collectionGid: 'gid://shopify/Collection/490773217431', collectionHandle: 'chanderi-unstitched-copy' },
      { id: 'stitched-chiffon', label: 'Chiffon', path: '/stitched/chiffon', collectionGid: 'gid://shopify/Collection/490773414039', collectionHandle: 'georgette-unstitched-copy' },
      { id: 'stitched-organza', label: 'Organza', path: '/stitched/organza', collectionGid: 'gid://shopify/Collection/490773545111', collectionHandle: 'chiffon-unstitched-copy' },
      { id: 'stitched-crepe-suits', label: 'Crepe Suits', path: '/stitched/crepe-suits', collectionGid: 'gid://shopify/Collection/490773872791', collectionHandle: 'organza-unstitched-copy' },
      { id: 'stitched-chinon', label: 'Chinon', path: '/stitched/chinon', collectionGid: 'gid://shopify/Collection/490774364311', collectionHandle: 'crepe-suits-unstitched-copy' },
    ],
  },
  {
    id: 'unstitched',
    label: 'Unstitched',
    path: '/unstitched',
    children: [
      { id: 'unstitched-cotton-dupatta-suits', label: 'Cotton Dupatta Suits', path: '/unstitched/cotton-dupatta-suits', collectionGid: 'gid://shopify/Collection/490764271767', collectionHandle: 'cotton-dupatta-suits-ustitched' },
      { id: 'unstitched-muslin', label: 'Muslin', path: '/unstitched/muslin', collectionGid: 'gid://shopify/Collection/490764468375', collectionHandle: 'muslin-copy' },
      { id: 'unstitched-rayon', label: 'Rayon', path: '/unstitched/rayon', collectionGid: 'gid://shopify/Collection/490934796439', collectionHandle: 'rayon-copy' },
      { id: 'unstitched-chanderi', label: 'Chanderi', path: '/unstitched/chanderi', collectionGid: 'gid://shopify/Collection/490773053591', collectionHandle: 'chanderi-copy' },
      { id: 'unstitched-georgette', label: 'Georgette', path: '/unstitched/georgette', collectionGid: 'gid://shopify/Collection/490773315735', collectionHandle: 'georgette-copy' },
      { id: 'unstitched-chiffon', label: 'Chiffon', path: '/unstitched/chiffon', collectionGid: 'gid://shopify/Collection/490773446807', collectionHandle: 'chiffon-copy' },
      { id: 'unstitched-organza', label: 'Organza', path: '/unstitched/organza', collectionGid: 'gid://shopify/Collection/490773577879', collectionHandle: 'organza-copy' },
      { id: 'unstitched-crepe-suits', label: 'Crepe Suits', path: '/unstitched/crepe-suits', collectionGid: 'gid://shopify/Collection/490773938327', collectionHandle: 'crepe-suits-copy' },
      { id: 'unstitched-chinon', label: 'Chinon', path: '/unstitched/chinon', collectionGid: 'gid://shopify/Collection/490774397079', collectionHandle: 'chinon-copy' },
    ],
  },
  {
    id: 'luxury',
    label: 'Luxury',
    path: '/luxury',
    isGrouped: true,
    groups: [
      {
        groupTitle: 'Stitched',
        items: [
          { id: 'luxury-stitched-gowns', label: 'Gowns', path: '/luxury/stitched/gowns' },
          { id: 'luxury-stitched-dresses', label: 'Dresses', path: '/luxury/stitched/dresses' },
          { id: 'luxury-stitched-premium-chikankari', label: 'Premium Chikankari', path: '/luxury/stitched/premium-chikankari', collectionHandle: 'premium-chikankari' },
          { id: 'luxury-stitched-farshi', label: 'Farshi', path: '/luxury/stitched/farshi', collectionGid: 'gid://shopify/Collection/490775478423', collectionHandle: 'premium-chikankari-copy' },
          { id: 'luxury-stitched-handwork', label: 'Handwork', path: '/luxury/stitched/handwork', collectionGid: 'gid://shopify/Collection/490775609495', collectionHandle: 'farshi-copy' },
          { id: 'luxury-stitched-kimkhab-gown', label: 'Kimkhab Gown', path: '/luxury/stitched/kimkhab-gown' },
        ],
      },
      {
        groupTitle: 'Unstitched',
        items: [
          { id: 'luxury-unstitched-handwork', label: 'Handwork', path: '/luxury/unstitched/handwork', collectionGid: 'gid://shopify/Collection/490775675031', collectionHandle: 'handwork-copy' },
          { id: 'luxury-unstitched-chiffon-semi-stitched', label: 'Chiffon Semi-Stitched', path: '/luxury/unstitched/chiffon-semi-stitched' },
          { id: 'luxury-unstitched-organza-handwork', label: 'Organza Handwork', path: '/luxury/unstitched/organza-handwork' },
          { id: 'luxury-unstitched-premium-lawn', label: 'Premium Lawn', path: '/luxury/unstitched/premium-lawn', collectionHandle: 'premium-lawn' },
          { id: 'luxury-unstitched-kimkhab-banarasi', label: 'Kimkhab Banarasi', path: '/luxury/unstitched/kimkhab-banarasi' },
        ],
      },
    ],
  },
  {
    id: 'special',
    label: 'Special',
    path: '/special',
    children: [
      { id: 'special-poncho', label: 'Poncho', path: '/special/poncho', collectionGid: 'gid://shopify/Collection/490776461463', collectionHandle: 'poncho' },
      { id: 'special-hijabs', label: 'Hijabs', path: '/special/hijabs', collectionGid: 'gid://shopify/Collection/490776526999', collectionHandle: 'poncho-copy' },
      { id: 'special-stole', label: 'Stole', path: '/special/stole', collectionGid: 'gid://shopify/Collection/490776625303', collectionHandle: 'hijabs-copy' },
      { id: 'special-shawl', label: 'Shawl', path: '/special/shawl', collectionGid: 'gid://shopify/Collection/490776690839', collectionHandle: 'stole-copy' },
    ],
  },
  {
    id: 'sale-deals',
    label: 'Sale Deals',
    path: '/sale-deals',
    children: [
      { id: 'sale-stock-clearance', label: 'Stock Clearance', path: '/sale-deals/stock-clearance' },
      { id: 'sale-summer-sale', label: 'Summer Sale', path: '/sale-deals/summer-sale' },
      { id: 'sale-winter-sale', label: 'Winter Sale', path: '/sale-deals/winter-sale' },
      { id: 'sale-monsoon-sale', label: 'Monsoon Sale', path: '/sale-deals/monsoon-sale' },
    ],
  },
  { id: 'about', label: 'About Us', path: '/about' },
  { id: 'contact', label: 'Contact Us', path: '/contact' },
];

export const TOP_NAV_LINKS = NAV_LINKS.filter((item) =>
  ['home', 'new-arrivals', 'about', 'contact'].includes(item.id)
);

export const CATEGORY_NAV_LINKS = NAV_LINKS.filter((item) =>
  ['shop-by-category', 'stitched', 'unstitched', 'luxury', 'special', 'sale-deals'].includes(item.id)
);

export const BRAND_INFO = {
  name: 'INAM CLOTH',
  tagline: 'Timeless Luxury Women’s Ethnic Wear',
  logoUrl: 'https://inamcloth.com/cdn/shop/files/logo.png?v=1732880181&width=200',
  phone: '+91 8527467030',
  email: 'support@inamcloth.com',
  address: 'Shop No. 12, Fashion Boulevard, New Delhi, India',
};
