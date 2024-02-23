import { useEffect, useState } from "react";

import { useUploadFileMutation } from "../../../slices/api/content/file.service";

import { UploadFileRequest } from "../../../slices/api/content/api.types";
import { Response } from "../../../../../common/types";
import { useUploadToFirebaseStorage } from "./use-upload-to-firebase-storage";

export function useUploadFile() {
  const [uploadFile] = useUploadFileMutation();

  const { payload, firebasError, uploadFileToFbStorage } =
    useUploadToFirebaseStorage();

  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    if (!firebasError) return;
    setError(firebasError);
  }, [firebasError]);

  const onUploadFile = async (
    file: File | null,
    storageFolderName: string,
    parentDirectoryId: string
  ) => {
    try {
      setIsLoading(true);
      await uploadFileToFbStorage(file, storageFolderName, parentDirectoryId);
      const res = payload
        ? ((await uploadFile(payload as UploadFileRequest)) as Response)
        : null;
      if (!res) {
        return setError(
          "Ooops, something went wrong while uploading the file!"
        );
      } else if (res.data.error) {
        return setError(
          "Ooops, something went wrong while uploading the file!"
        );
      }
      setSuccess(true);
    } catch (error) {
      setError("Ooops, something went wrong while uploading the file!");
    } finally {
      setIsLoading(false);
    }
  };

  return { success, onUploadFile, isLoading, error };
}
