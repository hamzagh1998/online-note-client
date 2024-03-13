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
  // Access userFbToken from the API state
  const userFbToken = (api.getState() as RootState).auth.fbToken;
  if (userFbToken) {
    headers.set("Authorization", "Bearer " + userFbToken);
  }

  return headers;
};

export const baseQuery = fetchBaseQuery({
  baseUrl: apiBaseUrl,
  prepareHeaders,
});

const baseQueryWithRetry = retry(baseQuery, { maxRetries: 3 });

// Create the API
export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithRetry,
  endpoints: () => ({}), // Add your endpoints here
  keepUnusedDataFor: 10000, // Timeout in milliseconds (e.g., 10 seconds)
});
