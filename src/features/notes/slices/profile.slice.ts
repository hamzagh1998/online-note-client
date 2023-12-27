import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type ProfileState = {
  plan: string;
  isPremium: boolean;
  subscriptionStartDate: null;
  subscriptionEndDate: null | Date;
  subscriptionLastRenewalDate: null | Date;
  storgeUsageInMb: number;
};

const initialState: ProfileState = {
  plan: "free",
  isPremium: false,
  subscriptionStartDate: null,
  subscriptionEndDate: null,
  subscriptionLastRenewalDate: null,
  storgeUsageInMb: 0,
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
        },
      }: PayloadAction<ProfileState>
    ) => {
      state.plan = plan;
      state.isPremium = isPremium;
      state.subscriptionStartDate = subscriptionStartDate;
      state.subscriptionEndDate = subscriptionEndDate;
      state.subscriptionLastRenewalDate = subscriptionLastRenewalDate;
      state.storgeUsageInMb = storgeUsageInMb;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUserProfile } = profileSlice.actions;
