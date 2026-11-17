import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';
import wishlistReducer from './slices/wishlistSlice';
import uiReducer from './slices/uiSlice';
import compareReducer from './slices/compareSlice';
import navigationReducer from './slices/navigationSlice';
import productReducer from './slices/productSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer,
    ui: uiReducer,
    compare: compareReducer,
    navigation: navigationReducer,
    products: productReducer,
  },
});

export default store;
