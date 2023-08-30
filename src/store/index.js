import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import dataReducer from "./data-slice";
import cartReducer from "./cart-slice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    foods: dataReducer,
    cart: cartReducer,
  },
});

export default store;
