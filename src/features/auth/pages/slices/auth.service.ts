import { api } from "../../../../redux/services/api";

import { LoginRequest, RegisterRequest, NewPasswordRequest } from "../types";

export const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation({
      query: (payload: LoginRequest) => ({
        url: "auth/login",
        method: "POST",
        body: payload,
      }),
    }),

    register: build.mutation({
      query: (payload: RegisterRequest) => ({
        url: "auth/register",
        method: "POST",
        body: payload,
      }),
    }),

    resetPassword: build.mutation({
      query: (payload: NewPasswordRequest) => ({
        url: "auth/new-password",
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
