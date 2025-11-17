import { configureStore } from '@reduxjs/toolkit';
import voiceReducer from './slices/voiceSlice';
import calendarReducer from './slices/calendarSlice';
import wellnessReducer from './slices/wellnessSlice';
import contentReducer from './slices/contentSlice';
import settingsReducer from './slices/settingsSlice';

export const store = configureStore({
  reducer: {
    voice: voiceReducer,
    calendar: calendarReducer,
    wellness: wellnessReducer,
    content: contentReducer,
    settings: settingsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
