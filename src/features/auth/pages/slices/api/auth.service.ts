import { api } from "../../../../../redux/api";

import { authEndpoints } from "./auth-endpoints";

import { LoginRequest, RegisterRequest, NewPasswordRequest } from "../../types";

export const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation({
      query: (payload: LoginRequest) => ({
        url: authEndpoints.LOGIN,
        method: "POST",
        body: payload,
      }),
    }),

    register: build.mutation({
      query: (payload: RegisterRequest) => ({
        url: authEndpoints.REGISTER,
        method: "POST",
        body: payload,
      }),
    }),

    resetPassword: build.mutation({
      query: (payload: NewPasswordRequest) => ({
        url: authEndpoints.NEW_PASSWORD,
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useResetPasswordMutation,
} = authApi;
