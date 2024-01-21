import { Notification } from "../slices/profile.slice";

export type ParentDirectory = {
  id: string;
  name: string;
};
// profile info
export type ProfileResponse = {
  plan: "free" | "premium";
  isPremium: boolean;
  currentFolder: {
    id: string;
    folderName: string;
    parentDirectory: ParentDirectory | null;
    children: Array<string> | [];
  };
  subscriptionStartDate: Date | null;
  subscriptionEndDate: Date | null;
  subscriptionLastRenewalDate: Date | null;
  storgeUsageInMb: number;
  notifications: Array<Notification>;
};

export type createFolderRequest = {
  name: string;
  password: string | null;
  parentDirectory: string;
};
