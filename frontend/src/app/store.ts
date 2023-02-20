import { configureStore } from '@reduxjs/toolkit'
import wishListReducer from '../slices/wishlistSlices';
import cartReducer from '../slices/cartSlice';

export const store = configureStore({
    reducer: {
        wishlist: wishListReducer,
        cart: cartReducer
    },
});