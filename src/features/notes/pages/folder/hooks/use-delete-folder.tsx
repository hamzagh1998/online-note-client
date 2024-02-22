import { useState } from "react";

import { useLazyDeleteFolderQuery } from "../../../slices/api/folder/folder.service";

export function useDeleteFolder() {
  const [deleteFolder] = useLazyDeleteFolderQuery();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);

  const onDelete = async (itemId: string) => {
    setIsLoading(true);
    const res = await deleteFolder(itemId);
    if (res.data.detail.error)
      return setError("OOps something went wrong while deleting folder!");

    setIsLoading(false);
  };
  return { onDelete, isLoading, error };
}
