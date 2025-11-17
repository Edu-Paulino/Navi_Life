import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Profile {
  id: string;
  full_name: string;
  onboarding_completed: boolean;
  integrates_calendar: boolean;
  receives_financial_news: boolean;
  receives_wellness_tips: boolean;
  uses_executive_assistant: boolean;
}

interface UserState {
  profile: Profile | null;
  loading: boolean;
}

const initialState: UserState = {
  profile: null,
  loading: true,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<Profile | null>) => {
      state.profile = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    updateProfile: (state, action: PayloadAction<Partial<Profile>>) => {
      if (state.profile) {
        state.profile = { ...state.profile, ...action.payload };
      }
    },
  },
});

export const { setProfile, setLoading, updateProfile } = userSlice.actions;

export default userSlice.reducer;
