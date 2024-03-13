import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type Notification = {
  id: string;
  title: string;
  content: string;
  userPhoto: string | null;
  link: string | null;
};

export type ParentDirectory = {
  id: string;
  name: string;
};

export type ProfileState = {
  plan: string;
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
  preferdTheme: "dark" | "light" | "default" | null;
};

const initialState: ProfileState = {
  plan: "free",
  isPremium: false,
  currentFolder: {
    id: "",
    folderName: "",
    parentDirectory: null,
    children: [],
  },
  subscriptionStartDate: null,
  subscriptionEndDate: null,
  subscriptionLastRenewalDate: null,
  storgeUsageInMb: 0,
  notifications: [],
  preferdTheme: null,
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setUserProfile: (
      state,
      {
        payload: {
          plan,
          isPremium,
          currentFolder,
          subscriptionStartDate,
          subscriptionEndDate,
          subscriptionLastRenewalDate,
          storgeUsageInMb,
          notifications,
          preferdTheme,
        },
      }: PayloadAction<ProfileState>
    ) => {
      state.plan = plan;
      state.isPremium = isPremium;
      state.currentFolder = { ...currentFolder };
      state.subscriptionStartDate = subscriptionStartDate;
      state.subscriptionEndDate = subscriptionEndDate;
      state.subscriptionLastRenewalDate = subscriptionLastRenewalDate;
      state.storgeUsageInMb = storgeUsageInMb;
      state.preferdTheme = preferdTheme;
      state.notifications = notifications;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUserProfile } = profileSlice.actions;
