import React from "react";

import { CustomInput } from "../../../../../common/components/inputs/custom-input";
import { SwitchComponent } from "../../../../../common/components/switch/switch.component";

import { createFolderRequest } from "../../types";

import { FolderData } from "../types";

type Props = {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  folderData: FolderData;
  setFolderData: React.Dispatch<React.SetStateAction<FolderData>>;
  isPrivate: boolean;
  setIsPrivate: React.Dispatch<React.SetStateAction<boolean>>;
  parentDirectory: string;
  onAddFolder: (payload: createFolderRequest) => Promise<void>;
  isLoading: boolean;
};

export function AddFolderModal({
  setOpenModal,
  folderData,
  setFolderData,
  isPrivate,
  setIsPrivate,
  parentDirectory,
  onAddFolder,
  isLoading,
}: Props) {
  const onCreate = async () => {
    if (!folderData.name.value.length)
      return setFolderData({
        ...folderData,
        name: { ...folderData.name, error: "Pls enter the folder name!" },
      });
    if (isPrivate) {
      if (!folderData.password.value) {
        return setFolderData({
          ...folderData,
          password: {
            ...folderData.password,
            error: "Password at least should contain 4 characters!",
          },
        });
      }
      if (folderData.password.value.length < 4) {
        return setFolderData({
          ...folderData,
          password: {
            ...folderData.password,
            error: "Password at least should contain 4 characters!",
          },
        });
      }
    }

    await onAddFolder({
      name: folderData.name.value,
      password: folderData.password.value,
      parentDirectory,
    });
    setFolderData({
      name: { value: "", error: null },
      password: { value: null, error: null },
    });
    setOpenModal(false);
  };

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center backdrop-filter backdrop-blur-md">
      <div className="flex flex-col py-10 px-16 w-fit h-fit rounded-md bg-skin-fill-secondary shadow-lg max-sm:h-full max-sm:w-full">
        <div className="inline-block text-center font-bold text-2xl  mt-2">
          <h1>Add new folder</h1>
        </div>
        <hr />
        <div className="min-w-[25rem] h-full my-8 max-sm:min-w-full max-sm:p-0">
          <p className="text-lg mb-2">Folder Name:</p>
          <CustomInput
            value={folderData.name.value}
            setValue={(value) =>
              setFolderData({
                ...folderData,
                name: {
                  ...folderData.name,
                  value,
                },
              })
            }
            error={folderData.name.error}
            placeholder="Enter folder name..."
          />
          <div className="flex justify-start items-center gap-3 my-6">
            Password:
            <SwitchComponent isChecked={isPrivate} onChange={setIsPrivate} />
            {isPrivate ? "Yes" : "No"}
          </div>
          {isPrivate ? (
            <>
              <p className="text-lg mb-2">Folder Password:</p>

              <CustomInput
                type="password"
                value={
                  folderData.password.value ? folderData.password.value : ""
                }
                setValue={(value) =>
                  setFolderData({
                    ...folderData,
                    password: {
                      ...folderData.password,
                      value,
                    },
                  })
                }
                error={folderData.password.error}
                placeholder="Enter folder password..."
              />
            </>
          ) : null}
        </div>
        <div className="flex flex-[20%] justify-center items-end">
          <button
            onClick={() => {
              setFolderData({
                name: { value: "", error: null },
                password: { value: null, error: null },
              });
              setOpenModal(false);
            }}
            className="w-36 h-11 m-2 border-none rounded-md cursor-pointer text-white bg-red-500 hover:bg-red-600"
          >
            Cancel
          </button>
          <button
            className="flex justify-center items-center w-36 h-11 m-2 border-none rounded-md cursor-pointer text-white bg-emerald-500 hover:bg-emerald-600"
            onClick={onCreate}
          >
            {isLoading ? "Loading" : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
}
