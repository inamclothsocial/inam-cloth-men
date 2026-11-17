import { shopifyFetch } from './shopifyClient';

const CREATE_CART_MUTATION = `
  mutation CreateCart($input: CartInput!) {
    cartCreate(input: $input) {
      cart {
        id
        checkoutUrl
        totalQuantity
        cost {
          totalAmount {
            amount
            currencyCode
          }
        }
      }
      userErrors {
        code
        field
        message
      }
    }
  }
`;

const GET_PRODUCT_VARIANTS_QUERY = `
  query GetProductVariants($id: ID!) {
    node(id: $id) {
      ... on Product {
        variants(first: 20) {
          nodes {
            id
            title
            availableForSale
            selectedOptions {
              name
              value
            }
          }
        }
      }
    }
  }
`;

async function resolveVariantId(item) {
  if (item.variantId && String(item.variantId).startsWith('gid://shopify/ProductVariant/')) {
    return item.variantId;
  }
  const prodId = item.productId || item.id;
  if (!prodId) return null;
  const fullProdGid = String(prodId).startsWith('gid://shopify/Product/')
    ? prodId
    : `gid://shopify/Product/${prodId}`;

  try {
    const data = await shopifyFetch({
      query: GET_PRODUCT_VARIANTS_QUERY,
      variables: { id: fullProdGid },
    });
    const variants = data?.node?.variants?.nodes || [];
    if (!variants.length) return null;

    if (item.size && item.size !== 'Standard') {
      const matched = variants.find((v) =>
        v.selectedOptions?.some(
          (opt) => opt.value?.toLowerCase() === item.size?.toLowerCase()
        )
      );
      if (matched) return matched.id;
    }
    return variants[0].id;
  } catch (err) {
    console.warn('Error resolving variant ID:', err.message);
    return null;
  }
}

export async function createShopifyCart(items = []) {
  if (!items || !items.length) {
    throw new Error('Shopping bag is empty.');
  }

  const lines = [];
  for (const item of items) {
    const variantId = await resolveVariantId(item);
    if (variantId) {
      lines.push({
        merchandiseId: variantId,
        quantity: Math.max(1, Number(item.quantity) || 1),
      });
    }
  }

  if (!lines.length) {
    throw new Error('No valid product variants found for checkout.');
  }

  const data = await shopifyFetch({
    query: CREATE_CART_MUTATION,
    variables: { input: { lines } },
  });

  const cartData = data?.cartCreate;
  if (cartData?.userErrors?.length) {
    throw new Error(cartData.userErrors[0].message);
  }

  const cart = cartData?.cart;
  if (!cart?.id) {
    throw new Error('Failed to create Shopify cart session.');
  }

  return {
    success: true,
    cartId: cart.id,
    checkoutUrl: cart.checkoutUrl,
    totalQuantity: cart.totalQuantity,
  };
}
