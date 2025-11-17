import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface WellnessState {
  burnoutScore: number;
  suggestedBreaks: string[];
  postponableMeetings: string[];
  weeklyStats: {
    totalMeetings: number;
    totalWorkHours: number;
    breaksTaken: number;
  };
}

const initialState: WellnessState = {
  burnoutScore: 0,
  suggestedBreaks: [],
  postponableMeetings: [],
  weeklyStats: {
    totalMeetings: 0,
    totalWorkHours: 0,
    breaksTaken: 0,
  },
};

const wellnessSlice = createSlice({
  name: 'wellness',
  initialState,
  reducers: {
    setBurnoutScore: (state, action: PayloadAction<number>) => {
      state.burnoutScore = action.payload;
    },
    setSuggestedBreaks: (state, action: PayloadAction<string[]>) => {
      state.suggestedBreaks = action.payload;
    },
    setPostponableMeetings: (state, action: PayloadAction<string[]>) => {
      state.postponableMeetings = action.payload;
    },
    updateWeeklyStats: (
      state,
      action: PayloadAction<Partial<WellnessState['weeklyStats']>>
    ) => {
      state.weeklyStats = { ...state.weeklyStats, ...action.payload };
    },
  },
});

export const {
  setBurnoutScore,
  setSuggestedBreaks,
  setPostponableMeetings,
  updateWeeklyStats,
} = wellnessSlice.actions;

export default wellnessSlice.reducer;
