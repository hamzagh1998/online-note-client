import { useState } from "react";

import { useLazyFolderDataQuery } from "../../../slices/api/folder/folder.service";

import { Response } from "../../../../../common/types";
import { FolderDataResponse } from "../types";

export function useGetFolderData(gItemId: string) {
  const [getFolderData] = useLazyFolderDataQuery();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);

  const onGetFolderData = async (
    cb: React.Dispatch<
      React.SetStateAction<FolderDataResponse | null | undefined>
    >
  ) => {
    setError(null);
    setIsLoading(true);
    try {
      const res = (await getFolderData(gItemId)) as Response;
      if (res.data.error)
        return setError(
          "Ooops, something went wrong while fetching folder data!"
        );
      cb(res.data.detail as FolderDataResponse);
    } catch (error) {
      return setError(
        "Ooops, something went wrong while fetching folder data!"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return { onGetFolderData, isLoading, error };
}
