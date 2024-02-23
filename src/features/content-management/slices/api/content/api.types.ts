import { GenericIem } from "../../../pages/types";

export type createFolderRequest = {
  name: string;
  password: string | null;
  parentDirectory: string;
};

export type UploadFileRequest = {
  name: string;
  ressourceLink: string;
  extension: string | undefined;
  fileSizeMB: number;
  fileType: string | undefined;
  parentDirectory: string;
};

export type FolderDataResponse = {
  children: Array<GenericIem>;
  folderName: string;
  id: string;
  parentDirectory: string | null;
};
