import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchProductsByCollection,
  fetchProductByHandle,
  fetchNewArrivalsProducts,
} from '../../services/productService';

export const fetchCollectionProductsThunk = createAsyncThunk(
  'products/fetchCollectionProducts',
  async (handle, { rejectWithValue }) => {
    try {
      const products = await fetchProductsByCollection(handle);
      return { handle, products };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchProductDetailThunk = createAsyncThunk(
  'products/fetchProductDetail',
  async (handle, { rejectWithValue }) => {
    try {
      const product = await fetchProductByHandle(handle);
      return product;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchNewArrivalsThunk = createAsyncThunk(
  'products/fetchNewArrivals',
  async (_, { rejectWithValue }) => {
    try {
      const products = await fetchNewArrivalsProducts();
      return products;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  collectionProducts: [],
  currentCollectionHandle: null,
  currentProduct: null,
  newArrivalsProducts: [],
  status: 'idle',
  error: null,
};

export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    clearCollectionProducts: (state) => {
      state.collectionProducts = [];
      state.currentCollectionHandle = null;
    },
    clearCurrentProduct: (state) => {
      state.currentProduct = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCollectionProductsThunk.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchCollectionProductsThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.collectionProducts = action.payload.products || [];
        state.currentCollectionHandle = action.payload.handle;
      })
      .addCase(fetchCollectionProductsThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
        state.collectionProducts = [];
      })
      .addCase(fetchProductDetailThunk.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchProductDetailThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentProduct = action.payload;
      })
      .addCase(fetchProductDetailThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(fetchNewArrivalsThunk.fulfilled, (state, action) => {
        state.newArrivalsProducts = action.payload || [];
      });
  },
});

export const { clearCollectionProducts, clearCurrentProduct } = productSlice.actions;

export const selectCollectionProducts = (state) => state.products.collectionProducts;
export const selectCurrentProduct = (state) => state.products.currentProduct;
export const selectNewArrivalsProducts = (state) => state.products.newArrivalsProducts;
export const selectProductsStatus = (state) => state.products.status;
export const selectProductsError = (state) => state.products.error;

export default productSlice.reducer;
