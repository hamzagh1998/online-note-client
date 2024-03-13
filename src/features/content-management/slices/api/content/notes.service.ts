import { api } from "../../../../../redux/api";
import { NoteRequest } from "./api.types";

import { notendpoints } from "./note-endpoints";

export const folderApi = api.injectEndpoints({
  endpoints: (build) => ({
    createNote: build.mutation({
      query: (payload: NoteRequest) => ({
        url: notendpoints.CREATE_NOTE,
        method: "POST",
        body: payload,
      }),
    }),

    noteDetail: build.query({
      query: (noteId: string) => ({
        url: notendpoints.CREATE_NOTE + "/" + noteId,
        method: "GET",
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
