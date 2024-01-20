import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";

import { HeaderComponent } from "../../../../common/components/header/header.component";
import { FloatingButtonComponent } from "./components/floating-button.component";
import { AddFolderModal } from "./components/add-folder-modal.component";

export function FilePage() {
  const [isFolderModalVisisble, setIsFolderModalVisisble] = useState(false);

  const { currentFolder } = useSelector((store: RootState) => store.profile);

  console.log(currentFolder);

  // const onAddFolder = async () => {};

  return (
    <div className="h-screen overflow-x-hidden">
      <HeaderComponent />
      <br />
      {!isFolderModalVisisble ? (
        <FloatingButtonComponent
          setIsFolderModalVisisble={setIsFolderModalVisisble}
        />
      ) : null}
      {isFolderModalVisisble ? (
        <AddFolderModal setOpenModal={setIsFolderModalVisisble} />
      ) : null}
    </div>
  );
}
