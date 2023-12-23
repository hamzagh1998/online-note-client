import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type AuthState = {
  userData: null | object;
  fbToken: null | string;
};

const initialState: AuthState = {
  userData: null,
  fbToken: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserData: (
      state,
      { payload: { userData, fbToken } }: PayloadAction<AuthState>
    ) => {
      state.userData = userData;
      state.fbToken = fbToken;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUserData } = authSlice.actions;

export default authSlice;
