import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ContentItem {
  id: string;
  title: string;
  summary: string;
  source: string;
  url: string;
  publishedAt: Date;
  category: string;
}

interface ContentState {
  topics: string[];
  dailyDigest: ContentItem[];
  digestTime: string;
  isLoading: boolean;
}

const initialState: ContentState = {
  topics: [],
  dailyDigest: [],
  digestTime: '09:00',
  isLoading: false,
};

const contentSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {
    setTopics: (state, action: PayloadAction<string[]>) => {
      state.topics = action.payload;
    },
    addTopic: (state, action: PayloadAction<string>) => {
      if (!state.topics.includes(action.payload)) {
        state.topics.push(action.payload);
      }
    },
    removeTopic: (state, action: PayloadAction<string>) => {
      state.topics = state.topics.filter((t) => t !== action.payload);
    },
    setDailyDigest: (state, action: PayloadAction<ContentItem[]>) => {
      state.dailyDigest = action.payload;
    },
    setDigestTime: (state, action: PayloadAction<string>) => {
      state.digestTime = action.payload;
    },
    setContentLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const {
  setTopics,
  addTopic,
  removeTopic,
  setDailyDigest,
  setDigestTime,
  setContentLoading,
} = contentSlice.actions;

export default contentSlice.reducer;
