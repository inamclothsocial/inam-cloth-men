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
      { id: 'stitched-muslin', label: 'Muslin', path: '/stitched/muslin' },
      { id: 'stitched-rayon', label: 'Rayon', path: '/stitched/rayon' },
      { id: 'stitched-chanderi', label: 'Chanderi', path: '/stitched/chanderi' },
      { id: 'stitched-georgette', label: 'Georgette', path: '/stitched/georgette' },
      { id: 'stitched-chiffon', label: 'Chiffon', path: '/stitched/chiffon', collectionGid: 'gid://shopify/Collection/490773414039', collectionHandle: 'georgette-unstitched-copy' },
      { id: 'stitched-organza', label: 'Organza', path: '/stitched/organza' },
      { id: 'stitched-crepe-suits', label: 'Crepe Suits', path: '/stitched/crepe-suits' },
      { id: 'stitched-chinon', label: 'Chinon', path: '/stitched/chinon' },
    ],
  },
  {
    id: 'unstitched',
    label: 'Unstitched',
    path: '/unstitched',
    children: [
      { id: 'unstitched-cotton-dupatta-suits', label: 'Cotton Dupatta Suits', path: '/unstitched/cotton-dupatta-suits', collectionGid: 'gid://shopify/Collection/490764271767', collectionHandle: 'cotton-dupatta-suits-ustitched' },
      { id: 'unstitched-muslin', label: 'Muslin', path: '/unstitched/muslin' },
      { id: 'unstitched-rayon', label: 'Rayon', path: '/unstitched/rayon' },
      { id: 'unstitched-chanderi', label: 'Chanderi', path: '/unstitched/chanderi' },
      { id: 'unstitched-georgette', label: 'Georgette', path: '/unstitched/georgette' },
      { id: 'unstitched-chiffon', label: 'Chiffon', path: '/unstitched/chiffon', collectionGid: 'gid://shopify/Collection/490773414039', collectionHandle: 'georgette-unstitched-copy' },
      { id: 'unstitched-organza', label: 'Organza', path: '/unstitched/organza' },
      { id: 'unstitched-crepe-suits', label: 'Crepe Suits', path: '/unstitched/crepe-suits' },
      { id: 'unstitched-chinon', label: 'Chinon', path: '/unstitched/chinon' },
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
          { id: 'luxury-stitched-premium-chikankari', label: 'Premium Chikankari', path: '/luxury/stitched/premium-chikankari' },
          { id: 'luxury-stitched-farshi', label: 'Farshi', path: '/luxury/stitched/farshi', collectionGid: 'gid://shopify/Collection/490775478423', collectionHandle: 'premium-chikankari-copy' },
          { id: 'luxury-stitched-handwork', label: 'Handwork', path: '/luxury/stitched/handwork' },
          { id: 'luxury-stitched-kimkhab-gown', label: 'Kimkhab Gown', path: '/luxury/stitched/kimkhab-gown' },
        ],
      },
      {
        groupTitle: 'Unstitched',
        items: [
          { id: 'luxury-unstitched-handwork', label: 'Handwork', path: '/luxury/unstitched/handwork' },
          { id: 'luxury-unstitched-chiffon-semi-stitched', label: 'Chiffon Semi-Stitched', path: '/luxury/unstitched/chiffon-semi-stitched' },
          { id: 'luxury-unstitched-organza-handwork', label: 'Organza Handwork', path: '/luxury/unstitched/organza-handwork' },
          { id: 'luxury-unstitched-premium-lawn', label: 'Premium Lawn', path: '/luxury/unstitched/premium-lawn' },
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
      { id: 'special-poncho', label: 'Poncho', path: '/special/poncho' },
      { id: 'special-hijabs', label: 'Hijabs', path: '/special/hijabs' },
      { id: 'special-stole', label: 'Stole', path: '/special/stole' },
      { id: 'special-shawl', label: 'Shawl', path: '/special/shawl' },
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
