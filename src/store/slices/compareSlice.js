import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  isCompareModalOpen: false,
};

export const compareSlice = createSlice({
  name: 'compare',
  initialState,
  reducers: {
    addToCompare: (state, action) => {
      const exists = state.items.some((item) => item.id === action.payload.id);
      if (!exists && state.items.length < 4) {
        state.items.push(action.payload);
      }
    },
    removeFromCompare: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    toggleCompare: (state, action) => {
      const index = state.items.findIndex((item) => item.id === action.payload.id);
      if (index !== -1) {
        state.items.splice(index, 1);
      } else if (state.items.length < 4) {
        state.items.push(action.payload);
      }
    },
    clearCompare: (state) => {
      state.items = [];
    },
    openCompareModal: (state) => {
      state.isCompareModalOpen = true;
    },
    closeCompareModal: (state) => {
      state.isCompareModalOpen = false;
    },
    toggleCompareModal: (state) => {
      state.isCompareModalOpen = !state.isCompareModalOpen;
    },
  },
});

export const {
  addToCompare,
  removeFromCompare,
  toggleCompare,
  clearCompare,
  openCompareModal,
  closeCompareModal,
  toggleCompareModal,
} = compareSlice.actions;

export const selectCompareItems = (state) => state.compare.items;
export const selectCompareCount = (state) => state.compare.items.length;
export const selectIsInCompare = (productId) => (state) =>
  state.compare.items.some((item) => item.id === productId);
export const selectIsCompareModalOpen = (state) => state.compare.isCompareModalOpen;

export default compareSlice.reducer;
