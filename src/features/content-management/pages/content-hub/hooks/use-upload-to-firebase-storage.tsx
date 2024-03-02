import { useState } from "react";
import {
  getDownloadURL,
  getMetadata,
  ref,
  uploadBytes,
} from "firebase/storage";

import { UploadFileRequest } from "../../../slices/api/content/api.types";
import { storage } from "../../../../../libs/firebase";

export function useUploadToFirebaseStorage() {
  const [payload, setPayload] = useState<UploadFileRequest | null>(null);
  const [firebasError, setFirebasErrorError] = useState<string | null>();

  const uploadFileToFbStorage = async (
    file: File | null,
    storageFolderName: string,
    parentDirectoryId: string
  ) => {
    // Check if the file is null or undefined
    if (!file) {
      return setFirebasErrorError("No file provided!");
    }

    // Check if the file size exceeds 80MB
    const maxSize = 80 * 1024 * 1024;
    if (file.size > maxSize) {
      return setFirebasErrorError("File size exceeds 80MB limit!");
    }

    try {
      const fileRef = ref(storage, `${storageFolderName}/${file.name}`);
      await uploadBytes(fileRef, file);
      // Get the file metadata to retrieve the size
      const metadata = await getMetadata(fileRef);
      const fileSizeBytes = metadata.size;
      const fileSizeMB = fileSizeBytes / (1024 * 1024); // Convert file size from bytes to megabytes: 1 MB = 1024 * 1024 bytes

      // Get the download URL for the file
      const url = await getDownloadURL(fileRef);

      // Extract file extension from the file name
      const fileName = metadata.name;
      const fileExtension = fileName.split(".").pop();

      // Get the file type from the content type
      const fileType = metadata.contentType;

      setPayload({
        name: fileName,
        extension: fileExtension,
        ressourceLink: url,
        parentDirectory: parentDirectoryId,
        fileSizeMB,
        fileType,
      });
      return url;
    } catch (error) {
      setFirebasErrorError("Failed to upload file. Please try again later!");
    }
  };

  return { payload, firebasError, uploadFileToFbStorage };
}
