import { ParentDirectory } from "../../profile.slice";

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
