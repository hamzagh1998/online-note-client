import { api } from "../../../../../redux/api";
import { createFolderRequest } from "../../../pages/types";

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
    createNote: build.mutation({
      query: (payload) => ({
        url: folderEndpoints.CREATE_NOTE,
        method: "POST",
        body: payload,
      }),
    }),
    uploadFile: build.mutation({
      query: (payload) => ({
        url: folderEndpoints.UPLOAD_FILE,
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
    deleteNote: build.query({
      query: (noteId: string) => ({
        url: folderEndpoints.DELETE_NOTE + "/" + noteId,
        method: "DELETE",
      }),
    }),
    deleteFile: build.query({
      query: (fileId: string) => ({
        url: folderEndpoints.DELETE_FILE + "/" + fileId,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useFolderDataQuery,
  useLazyFolderDataQuery,
  useCreateFolderMutation,
  useCreateNoteMutation,
  useUploadFileMutation,
  useLazyDeleteFolderQuery,
  useLazyDeleteFileQuery,
  useLazyDeleteNoteQuery,
} = folderApi;
