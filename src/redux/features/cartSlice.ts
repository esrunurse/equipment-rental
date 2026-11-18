import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem } from "../../../interfaces";

type CartState = {
  cartItems: CartItem[];
};

const initialState: CartState = { cartItems: [] };

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      state.cartItems.push(action.payload);
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.cartItems.splice(action.payload, 1);
    },
    setCart: (state, action: PayloadAction<CartItem[]>) => {
      state.cartItems = action.payload;
    },
    clearCart: (state) => {
      state.cartItems = [];
    },
  },
});

export const { addToCart, removeFromCart, setCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
