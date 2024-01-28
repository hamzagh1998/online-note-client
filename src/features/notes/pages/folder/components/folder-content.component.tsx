import { FaFolderMinus, FaStar } from "react-icons/fa6";
import { CiMenuKebab, CiStar } from "react-icons/ci";
import { IoIosInformationCircle, IoMdLock } from "react-icons/io";

import { GenericIem } from "../../types";
import { MdModeEdit } from "react-icons/md";
import { FaShareAlt, FaTrashAlt } from "react-icons/fa";
import { useState } from "react";

function ItemsList({
  item,
}: {
  item: GenericIem | undefined;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}) {
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
      <div className="flex justify-between items-center w-full font-bold hover:text-skin-error cursor-pointer">
        Delete
        <FaTrashAlt />
      </div>
    </div>
  );
}

export function FolderContentComponent({ items }: { items: GenericIem[] }) {
  const [showItemList, setShowItelList] = useState(false);
  const [selectedItem, setSelectedItem] = useState<GenericIem>();

  return (
    <section
      className="flex flex-wrap justify-center items-center gap-8 w-full h-full"
      onClick={(e) => {
        e.stopPropagation();
        setShowItelList(false);
      }}
    >
      {items.map((item) => (
        <div
          key={item._id}
          className="relative w-[20%] h-60 shadow-md rounded-md bg-skin-fill-secondary p-8 max-sm:w-full max-sm:h-48 hover:opacity-80"
        >
          {item.type === "folder" ? (
            <div className="flex flex-col justify-between w-full h-full">
              <div className="flex justify-start items-end gap-4 w-full">
                <FaFolderMinus className="text-skin-accent" size={32} />
                <p className="font-bold text-lg cursor-pointer hover:underline hover:text-skin-muted">
                  {item.name.length > 15
                    ? item.name.slice(0, 15) + "..."
                    : item.name}
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
                  <CiStar size={38} />
                ) : (
                  <FaStar size={32} color="#ffcf40" />
                )}
              </div>
            </div>
          ) : null}
          {showItemList ? (
            selectedItem?._id === item._id ? (
              <div className="absolute top-6 right-4">
                <ItemsList setShow={setShowItelList} item={selectedItem} />
              </div>
            ) : null
          ) : null}
        </div>
      ))}
    </section>
  );
}
