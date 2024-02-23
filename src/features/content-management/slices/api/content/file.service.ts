import { api } from "../../../../../redux/api";
import { UploadFileRequest } from "./api.types";

import { fileEndpoints } from "./file-endpoints";

export const folderApi = api.injectEndpoints({
  endpoints: (build) => ({
    uploadFile: build.mutation({
      query: (payload: UploadFileRequest) => ({
        url: fileEndpoints.UPLOAD_FILE,
        method: "POST",
        body: payload,
      }),
    }),
    deleteFile: build.query({
      query: (fileId: string) => ({
        url: fileEndpoints.DELETE_FILE + "/" + fileId,
        method: "DELETE",
      }),
    }),
  }),
});

export const { useUploadFileMutation, useLazyDeleteFileQuery } = folderApi;
