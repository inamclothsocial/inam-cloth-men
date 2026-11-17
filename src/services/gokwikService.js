import { createShopifyCart } from './shopifyCartService';
import { getShopifyCartPayload } from './gokwikCartBridge';

const GOKWIK_MID = import.meta.env.VITE_GOKWIK_MID || '1983dibvcu8t';
const GOKWIK_STORE_ID = import.meta.env.VITE_GOKWIK_STORE_ID || '66597847191';
const GOKWIK_ENV = import.meta.env.VITE_GOKWIK_ENVIRONMENT || 'production';
const GOKWIK_FB_PIXEL = import.meta.env.VITE_GOKWIK_FB_PIXEL || '';

export function setupGoKwikMerchant(extra = {}) {
  if (typeof window === 'undefined') return;
  const cartPayload = getShopifyCartPayload();
  window.merchantInfo = {
    mid: GOKWIK_MID,
    environment: GOKWIK_ENV,
    type: 'merchantInfo',
    storeId: GOKWIK_STORE_ID,
    fbPixel: GOKWIK_FB_PIXEL,
    isHydrogen: true,
    platform: 'shopify',
    cart: cartPayload,
    cartObject: cartPayload,
    cartToken: cartPayload.token,
    ...(window.merchantInfo || {}),
    ...extra,
  };
}

export function waitForGoKwikSdk(timeoutMs = 1500) {
  if (typeof window === 'undefined') return Promise.resolve(false);
  if (window.gokwikSdk?.initCheckout || typeof window.triggerGokwikCustomCheckout === 'function') {
    return Promise.resolve(true);
  }

  return new Promise((resolve) => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      if (window.gokwikSdk?.initCheckout || typeof window.triggerGokwikCustomCheckout === 'function') {
        clearInterval(interval);
        resolve(true);
      } else if (Date.now() - startTime >= timeoutMs) {
        clearInterval(interval);
        resolve(false);
      }
    }, 100);
  });
}

export async function initiateGoKwikCheckout(items = [], onProgress) {
  if (!items || !items.length) {
    throw new Error('Please add at least one item to bag before checkout.');
  }

  if (onProgress) onProgress('Securing Shopify cart session...');
  
  // 1. Create Shopify Cart Session (returns gid://shopify/Cart/<CARTID>)
  let cartResult = null;
  try {
    cartResult = await createShopifyCart(items);
  } catch (cartErr) {
    console.warn('Shopify cart creation note:', cartErr.message);
  }

  const cartId = cartResult?.cartId;
  const cartPayload = getShopifyCartPayload(items);

  // 2. Set window.merchantInfo with cart.id as per GoKwik Custom Storefront Doc
  window.merchantInfo = {
    mid: GOKWIK_MID,
    environment: GOKWIK_ENV,
    type: 'merchantInfo',
    storeId: GOKWIK_STORE_ID,
    fbPixel: GOKWIK_FB_PIXEL,
    isHydrogen: true,
    platform: 'shopify',
    cart: cartId ? { id: cartId } : cartPayload,
    cartObject: cartPayload,
    cartToken: cartPayload.token,
    ...(window.merchantInfo || {}),
  };

  if (onProgress) onProgress('Opening GoKwik Express Checkout...');
  await waitForGoKwikSdk(1800);

  // 3. Trigger GoKwik Custom Checkout
  try {
    if (typeof window.triggerGokwikCustomCheckout === 'function') {
      window.triggerGokwikCustomCheckout();
      return { type: 'gokwik_custom', cartId };
    }

    if (window.gokwikSdk && typeof window.gokwikSdk.initCheckout === 'function') {
      window.gokwikSdk.initCheckout(window.merchantInfo);
      return { type: 'gokwik_sdk', cartId };
    }
  } catch (sdkError) {
    console.warn('GoKwik SDK invocation fallback:', sdkError.message);
  }

  // 4. Graceful Fallback: Shopify Web Checkout if SDK is not active
  if (cartResult?.checkoutUrl) {
    if (onProgress) onProgress('Redirecting to checkout...');
    try {
      localStorage.setItem('shopifyCartId', cartResult.cartId);
    } catch (_) {}
    window.location.href = cartResult.checkoutUrl;
    return { type: 'shopify_checkout', checkoutUrl: cartResult.checkoutUrl };
  }

  // 5. Ultimate Fallback: Redirect to domain cart rather than throwing an error
  const fallbackDomain = window.Shopify?.domain || 'inamcloth.com';
  if (onProgress) onProgress('Redirecting to secure store cart...');
  window.location.href = `https://${fallbackDomain}/cart`;
  return { type: 'shopify_fallback', checkoutUrl: `https://${fallbackDomain}/cart` };
}
