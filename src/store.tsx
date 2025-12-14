import { configureStore } from "@reduxjs/toolkit";
import bookChef from "./slice/BookChef"

export const store = configureStore({
  reducer: {
      chef:bookChef
  },
});

// 🔹 Types for whole app
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
