import { api } from "../../../../../redux/api";

import { profileEndpoints } from "./profile-endpoints";

export const profileApi = api.injectEndpoints({
  endpoints: (build) => ({
    info: build.query({
      query: () => ({
        url: profileEndpoints.INFO,
        method: "GET",
      }),
    }),
    update: build.mutation({
      query: (payload) => ({
        url: profileEndpoints.INFO,
        method: "PATCH",
        body: payload,
      }),
    }),
  }),
});

export const { useInfoQuery, useLazyInfoQuery, useUpdateMutation } = profileApi;
