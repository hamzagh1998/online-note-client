import React from "react";
import { CustomInput } from "../../../../../common/components/inputs/custom-input";

type Props = {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export function AddFolderModal({ setOpenModal }: Props) {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center backdrop-filter backdrop-blur-md">
      <div className="flex flex-col py-10 px-16 w-1/2 h-1/2 rounded-md bg-skin-fill-secondary shadow-lg max-sm:h-full max-sm:w-full">
        <div className="inline-block text-center font-bold text-2xl  mt-2">
          <h1>Add new folder</h1>
        </div>
        <hr />
        <div className="flex flex-[50%] justify-center items-center text-center">
          {/* <CustomInput type="text" /> */}
        </div>
        <div className="flex flex-[20%] justify-center items-end">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
            className="w-36 h-11 m-2 border-none rounded-md cursor-pointer text-white bg-red-500 hover:bg-red-600"
          >
            Cancel
          </button>
          <button className="w-36 h-11 m-2 border-none rounded-md cursor-pointer text-white bg-emerald-500 hover:bg-emerald-600">
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
