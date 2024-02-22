import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  getMetadata,
} from "firebase/storage";
import { MdArrowBack } from "react-icons/md";
import { FaFolderOpen } from "react-icons/fa6";

import { storage } from "../../../../libs/firebase";

import { RootState } from "../../../../redux/store";

import { AddFolderModal } from "./components/add-folder-modal.component";

import { HeaderComponent } from "../../../../common/components/header/header.component";
import { FloatingButtonComponent } from "./components/floating-button.component";
import { ToastComponent } from "../../../../common/components/toast/toast.component";

import { useCreateFolder } from "./hooks/use-create-folder";

import { FolderData, FolderDataResponse } from "./types";
import { useGetFolderData } from "./hooks/use-get-folder-data";
import { FolderContentComponent } from "./components/folder-content.component";

export function FilePage() {
  const userProfile = useSelector((store: RootState) => store.profile);
  const userData = useSelector((store: RootState) => store.auth.userData);

  const { data, onAddFolder, isLoading, error } = useCreateFolder();
  const { onGetFolderData, error: error2 } = useGetFolderData(
    userProfile.currentFolder.id
  );

  const { currentFolder } = useSelector((store: RootState) => store.profile);

  const [isFolderModalVisisble, setIsFolderModalVisisble] = useState(false);

  const [folderData, setFolderData] = useState<FolderData>({
    name: { value: "", error: null },
    password: { value: null, error: null },
  });
  const [isPrivate, setIsPrivate] = useState(false);
  const [errorFile, setFileError] = useState<string | null>(null);

  const [folderInfo, setFolderInfo] = useState<null | FolderDataResponse>();

  const uploadFile = async (file: File | null) => {
    // Check if the file is null or undefined
    if (!file) {
      return setFileError("No file provided!");
    }

    // Check if the file size exceeds 80MB
    const maxSize = 80 * 1024 * 1024;
    if (file.size > maxSize) {
      return setFileError("File size exceeds 80MB limit!");
    }

    try {
      const fileRef = ref(storage, `${userData?.email}/${file.name}`);
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
    } catch (error) {
      setFileError("Failed to upload file. Please try again later!");
    }
  };

  useEffect(() => {
    if (!currentFolder.id.length) return;
    onGetFolderData(setFolderInfo);
  }, [currentFolder]);

  useEffect(() => {
    if (!data || !folderData) return;
    setFolderInfo(data as FolderDataResponse);
  }, [data, folderData]);

  return (
    <div className="h-screen overflow-x-hidden">
      <HeaderComponent />
      {/* content */}
      <section className="h-full px-14 py-7 max-sm:p-3">
        {currentFolder.parentDirectory ? (
          <div className="flex justify-start items-center gap-6">
            <div className="text-2xl text-skin-muted cursor-pointer hover:text-skin-base">
              <MdArrowBack />
            </div>
            <p className="flex justify-start items-center gap-3 text-2xl font-bold text-skin-muted underline">
              <FaFolderOpen />
              {currentFolder.folderName}
            </p>
          </div>
        ) : null}
        {!isFolderModalVisisble ? (
          <FloatingButtonComponent
            setIsFolderModalVisisble={setIsFolderModalVisisble}
            uploadFile={uploadFile}
          />
        ) : null}
        {isFolderModalVisisble ? (
          <AddFolderModal
            setOpenModal={setIsFolderModalVisisble}
            folderData={folderData}
            setFolderData={setFolderData}
            isPrivate={isPrivate}
            setIsPrivate={setIsPrivate}
            parentDirectory={currentFolder.id}
            isLoading={isLoading}
            onAddFolder={onAddFolder}
          />
        ) : null}
        {folderInfo ? (
          folderInfo.children.length ? (
            <FolderContentComponent items={folderInfo.children} />
          ) : null
        ) : null}
      </section>
      {error ? <ToastComponent type="error" message={error} /> : null}
      {error2 ? <ToastComponent type="error" message={error2} /> : null}
      {errorFile ? <ToastComponent type="error" message={errorFile} /> : null}
    </div>
  );
}
