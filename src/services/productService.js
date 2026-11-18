import { shopifyFetch } from './shopifyClient';
import { transformShopifyProduct, transformShopifyProducts } from '../utils/productTransformer';

const PRODUCT_FIELDS = `
  id title handle description descriptionHtml vendor productType availableForSale tags
  priceRange { minVariantPrice { amount currencyCode } maxVariantPrice { amount currencyCode } }
  compareAtPriceRange { minVariantPrice { amount currencyCode } maxVariantPrice { amount currencyCode } }
  featuredImage { url altText }
  images(first: 10) { nodes { url altText } }
  variants(first: 20) {
    nodes {
      id title availableForSale
      price { amount currencyCode }
      compareAtPrice { amount currencyCode }
      selectedOptions { name value }
      image { url }
    }
  }
  options { name values }
  collections(first: 5) { nodes { id title handle } }
`;

export const GET_COLLECTION_PRODUCTS_QUERY = `
  query GetCollectionProducts($handle: String!, $first: Int = 50) {
    collection(handle: $handle) {
      id title handle description
      image { url altText }
      products(first: $first) { nodes { ${PRODUCT_FIELDS} } }
    }
  }
`;

export const GET_COLLECTION_BY_NODE_QUERY = `
  query GetCollectionByNode($id: ID!, $first: Int = 50) {
    node(id: $id) {
      ... on Collection {
        id title handle description
        products(first: $first) { nodes { ${PRODUCT_FIELDS} } }
      }
    }
  }
`;

export const GET_PRODUCT_BY_HANDLE_QUERY = `
  query GetProductByHandle($handle: String!) {
    product(handle: $handle) { ${PRODUCT_FIELDS} }
  }
`;

let cachedCollectionsMap = null;
let collectionsMapFetchTime = 0;

export async function getShopifyCollectionsMap() {
  const now = Date.now();
  if (cachedCollectionsMap && now - collectionsMapFetchTime < 60000) {
    return cachedCollectionsMap;
  }
  try {
    const data = await shopifyFetch({
      query: `query GetAllCollections {
        collections(first: 100) {
          nodes { id title handle }
        }
      }`,
    });
    const nodes = data?.collections?.nodes || [];
    const map = new Map();
    nodes.forEach((col) => {
      if (col.handle) map.set(col.handle.toLowerCase().trim(), col.id);
      if (col.title) map.set(col.title.toLowerCase().trim(), col.id);
      const cleanSlug = col.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
      if (cleanSlug) map.set(cleanSlug, col.id);
    });
    cachedCollectionsMap = map;
    collectionsMapFetchTime = now;
    return map;
  } catch (err) {
    console.warn('Error fetching Shopify collections map:', err.message);
    return cachedCollectionsMap || new Map();
  }
}

export async function fetchProductsByCollection(target, first = 50) {
  if (!target) return [];

  // Known Shopify Collection Mappings
  const KNOWN_OVERRIDES = {
    chiffon: ['gid://shopify/Collection/490773414039', 'gid://shopify/Collection/490773446807'],
    'stitched-chiffon': ['gid://shopify/Collection/490773414039', 'gid://shopify/Collection/490773446807'],
    'unstitched-chiffon': ['gid://shopify/Collection/490773414039', 'gid://shopify/Collection/490773446807'],
    'georgette-unstitched-copy': ['gid://shopify/Collection/490773414039', 'gid://shopify/Collection/490773446807'],
    'chiffon-unstitched': ['gid://shopify/Collection/490773414039', 'gid://shopify/Collection/490773446807'],
    'chiffon-copy': ['gid://shopify/Collection/490773414039', 'gid://shopify/Collection/490773446807'],
    'chiffon-semi-stitched': 'gid://shopify/Collection/490775904407',
    'kimkhab-gharara-copy': 'gid://shopify/Collection/490775904407',
    'instagram-sale': 'gid://shopify/Collection/306869239959',
  };

  // If target string matches a known override that is an array
  if (typeof target === 'string') {
    const lower = target.toLowerCase().trim();
    if (KNOWN_OVERRIDES[lower] && Array.isArray(KNOWN_OVERRIDES[lower])) {
      return fetchProductsByCollection(KNOWN_OVERRIDES[lower], first);
    }
  }

  if (Array.isArray(target)) {
    const validHandles = target.filter(Boolean);
    if (!validHandles.length) return [];
    if (validHandles.length === 1) return fetchProductsByCollection(validHandles[0], first);
    const aliases = validHandles
      .map((h, i) => {
        if (h.startsWith('gid://shopify/Collection/')) {
          return `col_${i}: node(id: "${h}") { ... on Collection { products(first: ${first}) { nodes { ${PRODUCT_FIELDS} } } } }`;
        }
        return `col_${i}: collection(handle: "${h}") { products(first: ${first}) { nodes { ${PRODUCT_FIELDS} } } }`;
      })
      .join('\n');
    try {
      const data = await shopifyFetch({ query: `query GetMultiColProducts { ${aliases} }` });
      const seen = new Set();
      const all = [];
      if (data) {
        Object.values(data).forEach((col) => {
          col?.products?.nodes?.forEach((p) => {
            if (!seen.has(p.id)) { seen.add(p.id); all.push(p); }
          });
        });
      }
      return transformShopifyProducts(all);
    } catch (e) {
      console.warn('Error fetching multiple collections:', e.message);
      return [];
    }
  }

  let resolvedGid = null;
  if (typeof target === 'string') {
    if (target.startsWith('gid://shopify/Collection/')) {
      resolvedGid = target;
    } else {
      const lower = target.toLowerCase().trim();
      if (KNOWN_OVERRIDES[lower]) {
        resolvedGid = KNOWN_OVERRIDES[lower];
      } else {
        try {
          const map = await getShopifyCollectionsMap();
          if (map.has(lower)) {
            resolvedGid = map.get(lower);
          }
        } catch (_) {}
      }
    }
  }

  if (resolvedGid && typeof resolvedGid === 'string') {
    try {
      const data = await shopifyFetch({
        query: GET_COLLECTION_BY_NODE_QUERY,
        variables: { id: resolvedGid, first },
      });
      const prods = data?.node?.products?.nodes || [];
      if (prods.length > 0) {
        return transformShopifyProducts(prods);
      }
    } catch (e) {
      console.warn(`Error fetching collection node ${resolvedGid}:`, e.message);
    }
  }

  try {
    const data = await shopifyFetch({ query: GET_COLLECTION_PRODUCTS_QUERY, variables: { handle: target, first } });
    return transformShopifyProducts(data?.collection?.products?.nodes || []);
  } catch (e) {
    console.warn(`Error fetching collection ${target}:`, e.message);
    return [];
  }
}

export async function fetchProductByHandle(handle) {
  if (!handle) return null;
  try {
    const data = await shopifyFetch({ query: GET_PRODUCT_BY_HANDLE_QUERY, variables: { handle } });
    return transformShopifyProduct(data?.product);
  } catch (error) {
    console.warn(`Error fetching product ${handle}:`, error.message);
    return null;
  }
}

export async function fetchNewArrivalsProducts(first = 50) {
  try {
    return await fetchProductsByCollection('new-arrivals', first);
  } catch (error) {
    return [];
  }
}

export async function fetchAllStoreProducts(first = 50) {
  try {
    const data = await shopifyFetch({
      query: `query GetAllProducts($first: Int = 50) {
        products(first: $first) { nodes { ${PRODUCT_FIELDS} } }
      }`,
      variables: { first },
    });
    return transformShopifyProducts(data?.products?.nodes || []);
  } catch (error) {
    console.warn('Error fetching all products:', error.message);
    return [];
  }
}
