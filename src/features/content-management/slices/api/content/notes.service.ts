import { api } from "../../../../../redux/api";

import { notendpoints } from "./note-endpoints";

export const folderApi = api.injectEndpoints({
  endpoints: (build) => ({
    createNote: build.mutation({
      query: (payload) => ({
        url: notendpoints.CREATE_NOTE,
        method: "POST",
        body: payload,
      }),
    }),

    deleteNote: build.query({
      query: (noteId: string) => ({
        url: notendpoints.DELETE_NOTE + "/" + noteId,
        method: "DELETE",
      }),
    }),
  }),
});

export const { useCreateNoteMutation, useLazyDeleteNoteQuery } = folderApi;
