import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalItems: 0,
  totalAmount: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart: (state, action) => {
      const newItem = action.payload;
      state.totalItems++;
      state.totalAmount += +newItem.price;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      if (!existingItem) {
        state.items.push({
          ...newItem,
          quantity: 1,
          totalPrice: +newItem?.price,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.totalPrice + +newItem.price;
      }
    },

    removeItemFromCart: (state, action) => {
      const existingItem = action.payload;
      state.totalItems -= existingItem.quantity;
      state.totalAmount -= existingItem.totalPrice;
      state.items = state.items.filter((item) => item.id !== existingItem.id);
    },

    decreaseItemQuantity: (state, action) => {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      state.totalItems--;
      state.totalAmount -= +existingItem.price;
      if (existingItem.quantity === 1) {
        if (state.totalItems === 0) {
          state.totalAmount = 0;
        }
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice = existingItem.totalPrice - +existingItem.price;
      }
    },
  },
});

export const { addItemToCart, removeItemFromCart, decreaseItemQuantity } =
  cartSlice.actions;
export default cartSlice.reducer;
