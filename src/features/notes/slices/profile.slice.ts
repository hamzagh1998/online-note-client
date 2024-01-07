import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type Notification = {
  id: string;
  title: string;
  content: string;
  userPhoto: string | null;
  link: string | null;
};

export type ProfileState = {
  plan: string;
  isPremium: boolean;
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
