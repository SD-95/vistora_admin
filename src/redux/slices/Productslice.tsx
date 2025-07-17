import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { webProducttype } from '../../utils/Types';

interface ProductState {
  webProducts: webProducttype[];
}

const initialState: ProductState = {
  webProducts: [],
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    initializeProducts: (state, action: PayloadAction<webProducttype[]>) => {
      state.webProducts = action.payload;
    },
    addProduct: (state, action: PayloadAction<webProducttype>) => {
      state.webProducts.push(action.payload);
    },

    editProduct: (state, action: PayloadAction<webProducttype>) => {
      const index = state.webProducts.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.webProducts[index] = action.payload;
      }
    },

    deleteProduct: (state, action: PayloadAction<string>) => {
      state.webProducts = state.webProducts.filter(p => p.id !== action.payload);
    },

    updateStock: (state, action: PayloadAction<{ id: string; qty: number }>) => {
      const product = state.webProducts.find(p => p.id === action.payload.id);
      if (product) {
        product.stock = action.payload.qty;
        product.availability = product.stock <= 5 ? 'Limited Stock' : 'In Stock';
      }
    },

    markOutOfStock: (state, action: PayloadAction<string>) => {
      const product = state.webProducts.find(p => p.id === action.payload);
      if (product) {
        product.availability = 'Out of Stock';
      }
    },
  },
});

export const {
  addProduct,
  editProduct,
  deleteProduct,
  updateStock,
  markOutOfStock,
  initializeProducts,
} = productSlice.actions;

export default productSlice.reducer;
