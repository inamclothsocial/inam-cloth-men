import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isSearchOpen: false,
  isMobileMenuOpen: false,
  isWishlistOpen: false,
  quickViewProduct: null,
  toastMessage: null,
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    openSearch: (state) => {
      state.isSearchOpen = true;
    },
    closeSearch: (state) => {
      state.isSearchOpen = false;
    },
    toggleMobileMenu: (state) => {
      state.isMobileMenuOpen = !state.isMobileMenuOpen;
    },
    closeMobileMenu: (state) => {
      state.isMobileMenuOpen = false;
    },
    openWishlist: (state) => {
      state.isWishlistOpen = true;
    },
    closeWishlist: (state) => {
      state.isWishlistOpen = false;
    },
    toggleWishlistModal: (state) => {
      state.isWishlistOpen = !state.isWishlistOpen;
    },
    setQuickViewProduct: (state, action) => {
      state.quickViewProduct = action.payload;
    },
    clearQuickViewProduct: (state) => {
      state.quickViewProduct = null;
    },
    showToast: (state, action) => {
      state.toastMessage = action.payload;
    },
    hideToast: (state) => {
      state.toastMessage = null;
    },
  },
});

export const {
  openSearch,
  closeSearch,
  toggleMobileMenu,
  closeMobileMenu,
  openWishlist,
  closeWishlist,
  toggleWishlistModal,
  setQuickViewProduct,
  clearQuickViewProduct,
  showToast,
  hideToast,
} = uiSlice.actions;

export const selectIsSearchOpen = (state) => state.ui.isSearchOpen;
export const selectIsMobileMenuOpen = (state) => state.ui.isMobileMenuOpen;
export const selectIsWishlistOpen = (state) => state.ui.isWishlistOpen;
export const selectQuickViewProduct = (state) => state.ui.quickViewProduct;
export const selectToastMessage = (state) => state.ui.toastMessage;

export default uiSlice.reducer;
