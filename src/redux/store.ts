import { configureStore } from "@reduxjs/toolkit";

import { api } from "./services/api";

import authSlice from "../features/auth/pages/slices/auth.slice";

export interface RootState {
  auth: {
    userData: null | object;
    fbToken: null | string;
    token: null | string;
  };
}

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
