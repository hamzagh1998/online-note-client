export type ParentDirectory = {
  id: string;
  name: string;
};

export type GenericIem = {
  _id: string;
  itemId: string;
  name: string;
  owner: string;
  parentDirectory: string;
  type: "folder" | "note" | "file";
  fileType?: string;
  isPrivate: boolean;
  isFavorite: boolean;
};
