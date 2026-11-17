const STORAGE_KEY = 'inam_cart_items';
const GOKWIK_MID = import.meta.env.VITE_GOKWIK_MID || '1983dibvcu8t';
const GOKWIK_STORE_ID = import.meta.env.VITE_GOKWIK_STORE_ID || '66597847191';
const GOKWIK_ENV = import.meta.env.VITE_GOKWIK_ENVIRONMENT || 'production';
const GOKWIK_FB_PIXEL = import.meta.env.VITE_GOKWIK_FB_PIXEL || '';
const SHOPIFY_STORE_DOMAIN = import.meta.env.VITE_SHOPIFY_STORE_DOMAIN || 'ad6k2z-7v.myshopify.com';

export function getShopifyCartPayload(customItems = null) {
  let items = [];
  if (customItems && Array.isArray(customItems) && customItems.length) {
    items = customItems;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (_) {}
  } else {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) items = JSON.parse(saved);
    } catch (_) {}
  }

  const formattedItems = items.map((item, idx) => {
    const rawPrice = Number(item.price) || 0;
    const priceInPaise = Math.round(rawPrice * 100);
    const qty = Number(item.quantity) || 1;
    const rawVariantId = item.variantId || item.id || (1000000 + idx);
    const numVariantId = typeof rawVariantId === 'number'
      ? rawVariantId
      : parseInt(String(rawVariantId).replace(/\D/g, ''), 10) || (1000000 + idx);
    const numProdId = typeof item.productId === 'number'
      ? item.productId
      : parseInt(String(item.productId || item.id).replace(/\D/g, ''), 10) || numVariantId;

    return {
      id: numVariantId,
      variant_id: numVariantId,
      product_id: numProdId,
      title: item.name || 'Designer Festive Suit',
      product_title: item.name || 'Designer Festive Suit',
      variant_title: item.size || 'Standard',
      price: priceInPaise,
      line_price: priceInPaise * qty,
      original_price: priceInPaise,
      original_line_price: priceInPaise * qty,
      discounted_price: priceInPaise,
      quantity: qty,
      sku: item.sku || '',
      grams: 500,
      vendor: 'INAM CLOTH',
      handle: (item.name || 'product').toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      image: item.image || 'https://inamcloth.com/cdn/shop/files/141.jpg?v=1732737874&width=540',
      featured_image: {
        url: item.image || 'https://inamcloth.com/cdn/shop/files/141.jpg?v=1732737874&width=540',
      },
      url: `/product/${item.productId || item.id}`,
      requires_shipping: true,
      taxable: false,
      gift_card: false,
      final_price: priceInPaise,
      final_line_price: priceInPaise * qty,
      options_with_values: [{ name: 'Size', value: item.size || 'Standard' }],
    };
  });

  const totalPriceInPaise = formattedItems.reduce((acc, i) => acc + i.line_price, 0);
  const totalCount = formattedItems.reduce((acc, i) => acc + i.quantity, 0);
  const token = 'inam_cart_' + (typeof window !== 'undefined' ? (window.name || 'session') : '0');

  return {
    token,
    note: null,
    attributes: {},
    original_total_price: totalPriceInPaise,
    total_price: totalPriceInPaise,
    total_discount: 0,
    total_weight: 500 * totalCount,
    item_count: totalCount,
    items: formattedItems,
    requires_shipping: true,
    currency: 'INR',
    items_subtotal_price: totalPriceInPaise,
    cart_level_discount_applications: [],
  };
}

export function initGoKwikCartBridge() {
  if (typeof window === 'undefined' || window.__GOKWIK_BRIDGE_INIT) return;
  window.__GOKWIK_BRIDGE_INIT = true;

  window.Shopify = window.Shopify || {
    shop: SHOPIFY_STORE_DOMAIN,
    domain: 'inamcloth.com',
    currency: { active: 'INR', rate: '1.0' },
    country: 'IN',
    theme: { id: 1, name: 'Headless' },
    routes: { root: '/' },
  };

  window.merchantInfo = {
    mid: GOKWIK_MID,
    environment: GOKWIK_ENV,
    type: 'merchantInfo',
    storeId: GOKWIK_STORE_ID,
    fbPixel: GOKWIK_FB_PIXEL,
    isHydrogen: true,
    platform: 'shopify',
  };

  // Intercept window.fetch for /cart.js endpoints
  const originalFetch = window.fetch;
  window.fetch = function (input, init) {
    const url = typeof input === 'string' ? input : (input?.url || '');
    if (url.includes('/cart.js') || url.includes('/cart/clear.js') || url.includes('/cart/change.js') || url.includes('/cart/add.js')) {
      const payload = getShopifyCartPayload();
      return Promise.resolve(
        new Response(JSON.stringify(payload), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        })
      );
    }
    return originalFetch.apply(this, arguments);
  };
}
