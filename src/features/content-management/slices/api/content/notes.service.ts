import { api } from "../../../../../redux/api";
import { NoteRequest } from "./api.types";

import { notendpoints } from "./note-endpoints";

export const folderApi = api.injectEndpoints({
  endpoints: (build) => ({
    noteDetail: build.query({
      query: (noteId: string) => ({
        url: notendpoints.NOTE_DETAIL + "/" + noteId,
        method: "GET",
      }),
    }),

    createNote: build.mutation({
      query: (payload: NoteRequest) => ({
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

export const {
  useLazyNoteDetailQuery,
  useCreateNoteMutation,
  useLazyDeleteNoteQuery,
} = folderApi;
