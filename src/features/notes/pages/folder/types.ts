import { GenericIem } from "../types";

export type FolderData = {
  name: {
    value: string;
    error: null | string;
  };
  password: {
    value: null | string;
    error: null | string;
  };
};

export type FolderDataResponse = {
  children: Array<GenericIem>;
  folderName: string;
  id: string;
  parentDirectory: string | null;
};
