import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { MdArrowBack } from "react-icons/md";
import { FaFolderOpen } from "react-icons/fa6";

import { RootState } from "../../../../redux/store";

import { AddFolderModal } from "./components/add-folder-modal.component";

import { HeaderComponent } from "../../../../common/components/header/header.component";
import { FloatingButtonComponent } from "./components/floating-button.component";
import { ToastComponent } from "../../../../common/components/toast/toast.component";

import { useCreateFolder } from "./hooks/use-create-folder";

import { useGetFolderData } from "./hooks/use-get-folder-data";
import { FolderContentComponent } from "./components/folder-content.component";
import { useUploadFile } from "./hooks/use-upload-file";

import { FolderData } from "./types";

import { FolderDataResponse } from "../../slices/api/content/api.types";

export function CurrentContentPage() {
  const userProfile = useSelector((store: RootState) => store.profile);
  const userData = useSelector((store: RootState) => store.auth.userData);
  const { currentFolder } = useSelector((store: RootState) => store.profile);

  // folder custom hooks
  const { data, onAddFolder, isLoading, error } = useCreateFolder();
  const { onGetFolderData, error: error2 } = useGetFolderData(
    userProfile.currentFolder.id
  );

  // file custom hooks
  const {
    success,
    onUploadFile,
    isLoading: isUploadFileLoading,
    error: fileError,
  } = useUploadFile();

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
      await onUploadFile(file, userData?.email || "Unknown", currentFolder.id);
      setIsFolderModalVisisble(false);
      onGetFolderData(setFolderInfo);
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
            isUploadFileLoading={isUploadFileLoading}
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
      {fileError ? <ToastComponent type="error" message={fileError} /> : null}
      {success ? (
        <ToastComponent type="success" message="File uploaded successfully!" />
      ) : null}
    </div>
  );
}
