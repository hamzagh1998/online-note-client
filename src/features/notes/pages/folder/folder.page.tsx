import { useState } from "react";
import { MdArrowBack } from "react-icons/md";
import { FaFolderOpen } from "react-icons/fa6";
import { useSelector } from "react-redux";

import { RootState } from "../../../../redux/store";

import { AddFolderModal } from "./components/add-folder-modal.component";

import { HeaderComponent } from "../../../../common/components/header/header.component";
import { FloatingButtonComponent } from "./components/floating-button.component";
import { ToastComponent } from "../../../../common/components/toast/toast.component";

import { useCreateFolder } from "./hooks/use-create-folder";

import { FolderData } from "./types";

export function FilePage() {
  const { onAddFolder, isLoading, error } = useCreateFolder();

  const { currentFolder } = useSelector((store: RootState) => store.profile);

  const [isFolderModalVisisble, setIsFolderModalVisisble] = useState(false);

  const [folderData, setFolderData] = useState<FolderData>({
    name: { value: "", error: null },
    password: { value: null, error: null },
  });
  const [isPrivate, setIsPrivate] = useState(false);

  //console.log(currentFolder);

  return (
    <div className="h-screen overflow-x-hidden">
      <HeaderComponent />
      {/* content */}
      <section className="px-14 py-7 max-sm:p-3">
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
      </section>
      {error ? <ToastComponent type="error" message={error} /> : null}
    </div>
  );
}
