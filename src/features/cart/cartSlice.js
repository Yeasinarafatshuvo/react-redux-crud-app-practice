import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [], // Array of { product, quantity }
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const productToAdd = action.payload;
      // Use find to check if item already exists in cart
      const existingItem = state.items.find(item => item.product.id === productToAdd.id);
      
      if (existingItem) {
        // If it exists, increase quantity
        existingItem.quantity += 1;
      } else {
        // Use spread operator or array push to add new item
        state.items.push({ product: productToAdd, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      const productId = action.payload;
      // Use filter to remove item
      state.items = state.items.filter(item => item.product.id !== productId);
    },
    clearCart: (state) => {
      state.items = [];
    }
  }
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
