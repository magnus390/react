import { createSlice } from "@reduxjs/toolkit";
import { ItemCardProps} from "../components/sections/ItemCard"; 
const initialState : any   = {
  cart: [],
};

export const cartSlice = createSlice({
  name: "cartSlice",
  initialState,
  reducers: {
    // Actions
    addToCart: (state, action) => {
      if (!state.cart.id) {
        state.cart = [...state.cart, action.payload];
      }
    },
    removeFromCart: (state, action) => {
    
      const index = state.cart.findIndex(
        (cartItem : any) =>
        cartItem._id === action.payload.id
      );

      // console.log(index);
      
      let updatedWishList = [...state.cart];
      if (index >= 0) {
        updatedWishList.splice(index, 1);
      } else {
        console.warn(
          `Cant remove the item (id: ${action.payload.id}) as its not in basket`
        );
      }
      state.cart = updatedWishList;
    },
    onChangeQuantity: (state, action) => {
      const index = state.cart.findIndex(
        (cartItem : any) =>
        cartItem._id === action.payload.id
      );      
      let updatedWishList = [...state.cart];
      if (index >= 0) {
        updatedWishList[index].quantity = action.payload.quantity
      } else {
        console.warn(
          `Cant remove the item (id: ${action.payload.id}) as its not in basket`
        );
      }
      state.cart = updatedWishList;
    }
  },
});

export const { addToCart, removeFromCart,onChangeQuantity } = cartSlice.actions;

export const selectCartItems = (state : any) => state.cart.cart;
export default cartSlice.reducer;
