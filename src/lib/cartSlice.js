import { createSlice } from "@reduxjs/toolkit";

const savedCart = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { items: [], totalQuantity: 0, totalPrice: 0 };

const initialState = {
  items: savedCart.items,
  totalQuantity: savedCart.totalQuantity,
  totalPrice: savedCart.totalPrice,
};
const saveCart = (state) => {
  localStorage.setItem("cart", JSON.stringify(state));
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
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
      state.totalPrice += Number(newItem.price);

      saveCart(state);
    },
    removeCart: (state, action) => {
      const exist = state.items.find((i) => i.id === action.payload);
      if (exist) {
        state.totalQuantity -= exist.quantity;
        state.totalPrice -= Number(exist.price) * exist.quantity;
        state.items = state.items.filter((i) => i.id !== action.payload);
      }
      saveCart(state);
    },
    increaseQuantity: (state, action) => {
      const item = state.items.find((i) => i.id === action.payload);
      if (item) {
        item.quantity += 1;
        state.totalQuantity += 1;
        state.totalPrice += Number(item.price);
      }
      saveCart(state);
    },
    decreaseQuantity: (state, action) => {
      const item = state.items.find((i) => i.id === action.payload);
      if (item && item.quantity > 1) {
        // ✅ seulement si quantity > 1
        item.quantity -= 1;
        state.totalQuantity -= 1;
        state.totalPrice -= Number(item.price);
      }
      saveCart(state);
    },
    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
      saveCart(state);
    },
  },
});

export const { addToCart, increaseQuantity, decreaseQuantity, removeCart , clearCart } = cartSlice.actions;
export default cartSlice.reducer;
