import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalQuantity: 0,
  },
  reducers: {
    addToCart(state, action) {
      const newItem = action.payload;
      const exist = state.items.find((item) => item.id === newItem.id);

      if (exist) {
        exist.quantity++;
      } else {
        state.items.push({
          ...newItem,
          quantity: 1,
        });
      }
      state.totalQuantity++;
    },
    increaseQuantity: (state, action) => {
      const item = state.items.find((i) => i.id === action.payload);
      if (item) {
        item.quantity += 1;
        state.totalQuantity += 1;
      }
    },
    decreaseQuantity: (state, action) => {
      const item = state.items.find((i) => i.id === action.payload);
      if (item && item.quantity > 1) {
        // ✅ seulement si quantity > 1
        item.quantity -= 1;
        state.totalQuantity -= 1;
      }
    },
  },
});

export const { addToCart , increaseQuantity , decreaseQuantity } = cartSlice.actions;
export default cartSlice.reducer;
