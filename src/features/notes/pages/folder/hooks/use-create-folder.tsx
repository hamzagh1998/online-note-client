import { useState } from "react";

import { useCreateFolderMutation } from "../../../slices/api/folder/folder.service";

import { Response } from "../../../../../common/types";

import { createFolderRequest } from "../../types";

export function useCreateFolder() {
  const [createFolder] = useCreateFolderMutation();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);

  const onAddFolder = async (payload: createFolderRequest) => {
    setError(null);
    setIsLoading(true);
    try {
      const res = (await createFolder(payload)) as Response;
      if (res.data.error)
        return setError("Ooops, something went wrong while creating folder!");
    } catch (error) {
      setError("Ooops, something went wrong while creating folder!");
    } finally {
      setIsLoading(false);
    }
  };

  return { onAddFolder, isLoading, error };
}
