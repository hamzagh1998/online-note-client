import { api } from "../../../../../redux/api";
import { createFolderRequest } from "./api.types";

import { folderEndpoints } from "./folder-endpoints";

export const folderApi = api.injectEndpoints({
  endpoints: (build) => ({
    folderData: build.query({
      query: (gItemId: string) => ({
        url: folderEndpoints.GET_FOLDER_DATA + "?gItemId=" + gItemId,
        method: "GET",
      }),
    }),
    createFolder: build.mutation({
      query: (payload: createFolderRequest) => ({
        url: folderEndpoints.CREATE_FOLDER,
        method: "POST",
        body: payload,
      }),
    }),
    deleteFolder: build.query({
      query: (folderId: string) => ({
        url: folderEndpoints.DELETE_FOLDER + "/" + folderId,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useFolderDataQuery,
  useLazyFolderDataQuery,
  useCreateFolderMutation,
  useLazyDeleteFolderQuery,
} = folderApi;
