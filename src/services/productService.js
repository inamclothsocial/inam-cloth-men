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

export async function fetchProductsByCollection(target, first = 50) {
  if (!target) return [];
  if (Array.isArray(target)) {
    const validHandles = target.filter(Boolean);
    if (!validHandles.length) return [];
    if (validHandles.length === 1) return fetchProductsByCollection(validHandles[0], first);
    const aliases = validHandles.map((h, i) => `col_${i}: collection(handle: "${h}") { products(first: ${first}) { nodes { ${PRODUCT_FIELDS} } } }`).join('\n');
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
  if (typeof target === 'string' && target.startsWith('gid://shopify/Collection/')) {
    try {
      const data = await shopifyFetch({ query: GET_COLLECTION_BY_NODE_QUERY, variables: { id: target, first } });
      return transformShopifyProducts(data?.node?.products?.nodes || []);
    } catch (e) {
      console.warn(`Error fetching collection node ${target}:`, e.message);
      return [];
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
