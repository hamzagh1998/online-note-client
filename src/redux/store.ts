import { configureStore } from "@reduxjs/toolkit";

import { api } from "./api";

import { AuthState, authSlice } from "../features/auth/slices/auth.slice";
import {
  ProfileState,
  profileSlice,
} from "../features/content-management/slices/profile.slice";

export type RootState = {
  auth: AuthState;
  profile: ProfileState;
};

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth: authSlice.reducer,
    profile: profileSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type AppRootState = RootState;
