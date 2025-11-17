import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface VoiceState {
  isListening: boolean;
  isActive: boolean;
  transcript: string;
  response: string;
  isSpeaking: boolean;
}

const initialState: VoiceState = {
  isListening: false,
  isActive: false,
  transcript: '',
  response: '',
  isSpeaking: false,
};

const voiceSlice = createSlice({
  name: 'voice',
  initialState,
  reducers: {
    setListening: (state, action: PayloadAction<boolean>) => {
      state.isListening = action.payload;
    },
    setActive: (state, action: PayloadAction<boolean>) => {
      state.isActive = action.payload;
    },
    setTranscript: (state, action: PayloadAction<string>) => {
      state.transcript = action.payload;
    },
    setResponse: (state, action: PayloadAction<string>) => {
      state.response = action.payload;
    },
    setSpeaking: (state, action: PayloadAction<boolean>) => {
      state.isSpeaking = action.payload;
    },
    resetVoice: (state) => {
      state.transcript = '';
      state.response = '';
      state.isListening = false;
    },
  },
});

export const {
  setListening,
  setActive,
  setTranscript,
  setResponse,
  setSpeaking,
  resetVoice,
} = voiceSlice.actions;

export default voiceSlice.reducer;
