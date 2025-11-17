import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SettingsState {
  voiceEnabled: boolean;
  notificationsEnabled: boolean;
  language: 'pt-BR' | 'en-US';
  theme: 'light' | 'dark';
}

const initialState: SettingsState = {
  voiceEnabled: true,
  notificationsEnabled: true,
  language: 'pt-BR',
  theme: 'light',
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setVoiceEnabled: (state, action: PayloadAction<boolean>) => {
      state.voiceEnabled = action.payload;
    },
    setNotificationsEnabled: (state, action: PayloadAction<boolean>) => {
      state.notificationsEnabled = action.payload;
    },
    setLanguage: (state, action: PayloadAction<'pt-BR' | 'en-US'>) => {
      state.language = action.payload;
    },
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.theme = action.payload;
    },
  },
});

export const {
  setVoiceEnabled,
  setNotificationsEnabled,
  setLanguage,
  setTheme,
} = settingsSlice.actions;

export default settingsSlice.reducer;
