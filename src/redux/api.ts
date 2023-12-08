import {
  createApi,
  fetchBaseQuery,
  retry,
  BaseQueryApi,
} from "@reduxjs/toolkit/query/react";

import { RootState } from "./store";
import { apiBaseUrl } from "../config";

// Define prepareHeaders function
const prepareHeaders = (
  headers: Headers,
  api: Pick<BaseQueryApi, "getState">
) => {
  const token = (api.getState() as RootState).auth.token;
  if (token) {
    headers.set("Authorization", "Bearer " + token);
  }
  return headers;
};

export const baseQuery = fetchBaseQuery({
  baseUrl: apiBaseUrl,
  prepareHeaders,
});

const baseQueryWithRetry = retry(baseQuery, { maxRetries: 5 });

// Create the API
export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithRetry,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  endpoints: (build) => ({}), // Add your endpoints here
});
