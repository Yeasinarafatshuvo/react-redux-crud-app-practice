import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product, CartItem } from '../../types';

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const productToAdd = action.payload;
      const existingItem = state.items.find(item => item.product.id === productToAdd.id);
      
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ product: productToAdd, quantity: 1 });
      }
    },
    removeFromCart: (state, action: PayloadAction<string | number>) => {
      const productId = action.payload;
      state.items = state.items.filter(item => item.product.id !== productId);
    },
    clearCart: (state) => {
      state.items = [];
    }
  }
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
