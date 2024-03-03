import { useState } from "react";

import { useCreateNoteMutation } from "../../../slices/api/content/notes.service";

import { NoteRequest } from "../../../slices/api/content/api.types";

import { Response } from "../../../../../common/types";

export function useCreateNote() {
  const [createNote] = useCreateNoteMutation();

  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<null | string>(null);

  const onCreateNote = async (payload: NoteRequest) => {
    try {
      setIsLoading(true);
      const res = (await createNote(payload)) as Response;
      if (!res.data.error) setSuccess(true);
    } catch (error) {
      setError("Ooops, something went wrong while creating note!");
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  return { success, onCreateNote, isLoading, error };
}
