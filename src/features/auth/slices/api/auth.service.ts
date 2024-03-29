import { api } from "../../../../redux/api";

import {
  LoginRequest,
  NewPasswordRequest,
  RegisterRequest,
} from "../../pages/types";

import { authEndpoints } from "./auth-endpoints";

export const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    auth: build.query({
      query: () => ({
        url: authEndpoints.AUTH,
        method: "GET",
      }),
    }),

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
  useLazyAuthQuery,
  useAuthQuery,
  useLoginMutation,
  useRegisterMutation,
  useResetPasswordMutation,
} = authApi;
