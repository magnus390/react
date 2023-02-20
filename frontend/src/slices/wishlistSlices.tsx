import { createSlice } from "@reduxjs/toolkit";
import { ItemCardProps} from "../components/sections/ItemCard"; 
export const initialState : any   = {
  items: [],
};

export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    // Actions
    addToWishlist: (state, action) => {
      if (!state.items.id) {
        state.items = [...state.items, action.payload];
      }
    },
    removeFromWishlist: (state, action) => {

      const index = state.items.findIndex(
        (wishlistItem: any) => wishlistItem.id === action.payload.id
      );
      let newWishlist = [...state.items];
      if (index >= 0) {
        // item exist in the basket ... remove it
        newWishlist.splice(index, 1);
      } else {
        console.warn(
          `Cant remove the product (id: ${action.payload.data.id}) as its not in basket`
        );
      }
      state.items = newWishlist;
    },
  },
});

export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;

export const selectItems = (state : any) => state.wishlist.items;
export default wishlistSlice.reducer;
