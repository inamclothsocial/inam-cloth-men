import { createSlice } from '@reduxjs/toolkit';

const STORAGE_KEY = 'inam_cart_items';

const loadCartFromStorage = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch (err) {
    console.warn('Failed to load cart from storage:', err);
    return [];
  }
};

const saveCartToStorage = (items) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch (err) {
    console.warn('Failed to save cart to storage:', err);
  }
};

const initialState = {
  items: loadCartFromStorage(),
  isOpen: false,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const payload = action.payload;
      const product = payload.product || payload;
      const size = payload.size || 'Standard';
      const quantity = Number(payload.quantity) || 1;
      const price = Number(product.price) || 0;
      const origPrice = Number(product.originalPrice) || price;
      const prodId = product.id || String(Date.now());
      const variantId = payload.variantId || product.variantId || product.variants?.[0]?.id || null;
      const itemId = `${prodId}-${size}`;

      const existing = state.items.find((i) => i.id === itemId || i.productId === prodId);
      if (existing) {
        existing.quantity += quantity;
        if (variantId) existing.variantId = variantId;
      } else {
        state.items.push({
          id: itemId,
          productId: prodId,
          variantId,
          name: product.name || 'Designer Festive Suit',
          price,
          originalPrice: origPrice,
          image: product.image || product.images?.[0] || 'https://inamcloth.com/cdn/shop/files/141.jpg?v=1732737874&width=540',
          size,
          quantity,
        });
      }
      saveCartToStorage(state.items);
      state.isOpen = true;
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((i) => i.id !== action.payload && i.productId !== action.payload);
      saveCartToStorage(state.items);
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find((i) => i.id === id || i.productId === id);
      if (item) {
        if (quantity <= 0) {
          state.items = state.items.filter((i) => i.id !== id && i.productId !== id);
        } else {
          item.quantity = quantity;
        }
      }
      saveCartToStorage(state.items);
    },
    toggleCartDrawer: (state) => { state.isOpen = !state.isOpen; },
    closeCartDrawer: (state) => { state.isOpen = false; },
    clearCart: (state) => {
      state.items = [];
      saveCartToStorage([]);
    },
  },
});

export const {
  addToCart, removeFromCart, updateQuantity,
  toggleCartDrawer, closeCartDrawer, clearCart,
} = cartSlice.actions;

export const selectCartItems = (state) => state.cart.items;
export const selectCartCount = (state) =>
  state.cart.items.reduce((total, item) => total + (Number(item.quantity) || 1), 0);
export const selectCartTotal = (state) =>
  state.cart.items.reduce((total, item) => total + (Number(item.price) || 0) * (Number(item.quantity) || 1), 0);
export const selectIsCartOpen = (state) => state.cart.isOpen;

export default cartSlice.reducer;
