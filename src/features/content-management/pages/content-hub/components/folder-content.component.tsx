import { useState } from "react";
import {
  FaFolderMinus,
  FaRegFile,
  FaRegFileAudio,
  FaRegFileExcel,
  FaRegFileImage,
  FaRegFilePdf,
  FaRegFilePowerpoint,
  FaRegFileVideo,
  FaRegFileWord,
  FaStar,
} from "react-icons/fa6";
import { CiMenuKebab, CiStar } from "react-icons/ci";
import { IoIosInformationCircle, IoMdLock } from "react-icons/io";
import { MdModeEdit } from "react-icons/md";
import { FaShareAlt, FaTrashAlt } from "react-icons/fa";

import { useDeleteFolder } from "../hooks/use-delete-folder";

import { GenericIem } from "../../types";
import { ToastComponent } from "../../../../../common/components/toast/toast.component";
import { SpinnerIndicatorsComponent } from "../../../../../common/components/activities-indicators/spinner-indicators.component";
import {
  BsFileEarmarkBarGraph,
  BsFileEarmarkText,
  BsFiletypeCss,
  BsFiletypeHtml,
  BsFiletypeJson,
  BsFiletypeXml,
} from "react-icons/bs";
import { PiFileJsThin } from "react-icons/pi";

function ItemsList({
  item,
}: {
  item: GenericIem;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { error, isLoading: isDeleteLoading, onDelete } = useDeleteFolder();

  return (
    <div className="flex flex-col justify-around items-center bg-skin-fill-primary rounded-md shadow-md w-32 h-fit px-4 py-2">
      <div className="flex justify-between items-center w-full font-bold hover:text-skin-accent cursor-pointer">
        Info
        <IoIosInformationCircle />
      </div>
      {item ? (
        item.type !== "folder" ? (
          <div className="flex justify-between items-center w-full font-bold hover:text-skin-accent cursor-pointer">
            Share
            <FaShareAlt />
          </div>
        ) : null
      ) : null}

      <div className="flex justify-between items-center w-full font-bold hover:text-skin-accent cursor-pointer">
        Edit
        <MdModeEdit />
      </div>
      <div
        className="flex justify-between items-center w-full font-bold hover:text-skin-error cursor-pointer"
        onClick={() => onDelete(item._id)}
      >
        Delete
        {isDeleteLoading ? <SpinnerIndicatorsComponent /> : <FaTrashAlt />}
      </div>
      {error ? <ToastComponent type="error" message={error} /> : null}
    </div>
  );
}

type ItemContentProps = {
  item: GenericIem;
  itemType: "file" | "folder" | "note";
  showItemList: boolean;
  selectedItem: GenericIem | undefined;
  setSelectedItem: React.Dispatch<React.SetStateAction<GenericIem | undefined>>;
  setShowItelList: React.Dispatch<React.SetStateAction<boolean>>;
};

function ItemContent({
  item,
  itemType,
  selectedItem,
  showItemList,
  setSelectedItem,
  setShowItelList,
}: ItemContentProps) {
  const getFileIcon = (fileType: string) => {
    if (fileType.includes("video")) {
      return <FaRegFileVideo className="text-skin-accent" size={32} />;
    } else if (fileType.includes("audio")) {
      return <FaRegFileAudio className="text-skin-accent" size={32} />;
    } else if (fileType.includes("plain")) {
      return <BsFileEarmarkText className="text-skin-accent" size={32} />;
    } else if (fileType.includes("json")) {
      return <BsFiletypeJson className="text-skin-accent" size={32} />;
    } else if (fileType.includes("image")) {
      return <FaRegFileImage className="text-skin-accent" size={32} />;
    } else if (fileType.includes("pdf")) {
      return <FaRegFilePdf className="text-skin-accent" size={32} />;
    } else if (fileType.includes("html")) {
      return <BsFiletypeHtml className="text-skin-accent" size={32} />;
    } else if (fileType.includes("css")) {
      return <BsFiletypeCss className="text-skin-accent" size={32} />;
    } else if (fileType.includes("javascript")) {
      return <PiFileJsThin className="text-skin-accent" size={32} />;
    } else if (
      fileType.includes("vnd.openxmlformats-officedocument.spreadsheetml.sheet") // excel
    ) {
      return <FaRegFileExcel className="text-skin-accent" size={32} />;
    } else if (
      fileType.includes(
        "vnd.openxmlformats-officedocument.presentationml.presentation" // powerpoint
      )
    ) {
      return <FaRegFilePowerpoint className="text-skin-accent" size={32} />;
    } else if (
      fileType.includes(
        "vnd.openxmlformats-officedocument.wordprocessingml.document" // word
      )
    ) {
      return <FaRegFileWord className="text-skin-accent" size={32} />;
    } else if (
      fileType.includes(
        "vnd.jgraph.mxfile" // graph
      )
    ) {
      return <BsFileEarmarkBarGraph className="text-skin-accent" size={32} />;
    } else if (fileType.includes("xml")) {
      return <BsFiletypeXml className="text-skin-accent" size={32} />;
    } else {
      return <FaRegFile className="text-skin-accent" size={32} />;
    }
  };

  return (
    <div className="relative w-[20%] h-56 shadow-md rounded-md bg-skin-fill-secondary p-8 max-md:w-[40%] max-sm:w-full max-sm:h-48 hover:opacity-80">
      <div className="flex flex-col justify-between w-full h-full">
        <div className="flex justify-start items-end gap-4 w-full">
          {itemType === "folder" ? (
            <FaFolderMinus className="text-skin-accent" size={32} />
          ) : itemType === "file" ? (
            item.fileType ? (
              getFileIcon(item.fileType)
            ) : null
          ) : null}
          <p className="font-bold text-lg cursor-pointer hover:underline hover:text-skin-muted">
            {item.name.length > 15 ? item.name.slice(0, 15) + "..." : item.name}
          </p>
          {item.isPrivate ? <IoMdLock size={24} /> : null}
          <div
            className="absolute top-4 right-2 cursor-pointer hover:text-skin-muted"
            onClick={(e) => {
              e.stopPropagation(); // Stop propagation here to prevent it from reaching the parent div
              setSelectedItem(item);
              setShowItelList(true);
            }}
          >
            <CiMenuKebab size={20} />
          </div>
        </div>
        <div className="cursor-pointer w-fit">
          {item.isFavorite ? (
            <FaStar size={32} color="#ffcf40" />
          ) : (
            <CiStar size={38} />
          )}
        </div>
      </div>
      {showItemList ? (
        selectedItem?._id === item._id ? (
          <div className="absolute top-6 right-4">
            <ItemsList setShow={setShowItelList} item={selectedItem} />
          </div>
        ) : null
      ) : null}
    </div>
  );
}

export function FolderContentComponent({ items }: { items: GenericIem[] }) {
  const [showItemList, setShowItelList] = useState(false);
  const [selectedItem, setSelectedItem] = useState<GenericIem>();

  return (
    <section
      className="flex flex-wrap items-start justify-center gap-2"
      onClick={() => setShowItelList(false)}
    >
      {items.map((item) => (
        <ItemContent
          key={item.itemId}
          item={item}
          showItemList={showItemList}
          selectedItem={selectedItem}
          itemType={item.type}
          setSelectedItem={setSelectedItem}
          setShowItelList={setShowItelList}
        />
      ))}
    </section>
  );
}
