import { configureStore } from "@reduxjs/toolkit";

import { api } from "./api";

import authSlice, { AuthState } from "../features/auth/slices/auth.slice";

export type RootState = {
  auth: AuthState;
};

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth: authSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type AppRootState = RootState;
