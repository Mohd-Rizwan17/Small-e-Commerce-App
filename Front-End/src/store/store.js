import { configureStore } from "@reduxjs/toolkit";
import authReducer, { clearAuth } from "./authSlice";
import { setUnauthorizedHandler } from "../api/axios";

const store = configureStore({
  reducer: { auth: authReducer },
});

setUnauthorizedHandler(() => store.dispatch(clearAuth()));

export default store;
