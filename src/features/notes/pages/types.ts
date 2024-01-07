import { Notification } from "../slices/profile.slice";

// profile info
export type ProfileResponse = {
  plan: "free" | "premium";
  isPremium: boolean;
  subscriptionStartDate: Date | null;
  subscriptionEndDate: Date | null;
  subscriptionLastRenewalDate: Date | null;
  storgeUsageInMb: number;
  notifications: Array<Notification>;
};
