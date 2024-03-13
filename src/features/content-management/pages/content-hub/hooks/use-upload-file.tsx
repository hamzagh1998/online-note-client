import { useEffect, useState } from "react";

import { useUploadFileMutation } from "../../../slices/api/content/file.service";

import { Response } from "../../../../../common/types";
import { useUploadToFirebaseStorage } from "../../hooks/use-upload-to-firebase-storage";

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

  useEffect(() => {
    if (!payload) return;
    (async () => {
      try {
        const res = (await uploadFile(payload)) as Response;
        if (res.data.error) {
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
    })();
  }, [payload]);

  const onUploadFile = async (
    file: File | null,
    storageFolderName: string,
    parentDirectoryId: string
  ) => {
    try {
      setIsLoading(true);
      await uploadFileToFbStorage(file, storageFolderName, parentDirectoryId);
    } catch (error) {
      setError("Ooops, something went wrong while uploading the file!");
      setIsLoading(false);
    }
  };

  return { success, onUploadFile, isLoading, error };
}
