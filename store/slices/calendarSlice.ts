import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CalendarEvent {
  id: string;
  title: string;
  startTime: Date;
  endTime: Date;
  description?: string;
  priority?: 'high' | 'medium' | 'low';
  source: 'google' | 'outlook';
  isFocusBlock?: boolean;
}

interface CalendarState {
  events: CalendarEvent[];
  priorities: string[];
  focusBlocks: CalendarEvent[];
  isLoading: boolean;
  connectedCalendars: {
    google: boolean;
    outlook: boolean;
  };
}

const initialState: CalendarState = {
  events: [],
  priorities: [],
  focusBlocks: [],
  isLoading: false,
  connectedCalendars: {
    google: false,
    outlook: false,
  },
};

const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    setEvents: (state, action: PayloadAction<CalendarEvent[]>) => {
      state.events = action.payload;
    },
    addEvent: (state, action: PayloadAction<CalendarEvent>) => {
      state.events.push(action.payload);
    },
    setPriorities: (state, action: PayloadAction<string[]>) => {
      state.priorities = action.payload;
    },
    setFocusBlocks: (state, action: PayloadAction<CalendarEvent[]>) => {
      state.focusBlocks = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setCalendarConnection: (
      state,
      action: PayloadAction<{ type: 'google' | 'outlook'; connected: boolean }>
    ) => {
      state.connectedCalendars[action.payload.type] = action.payload.connected;
    },
  },
});

export const {
  setEvents,
  addEvent,
  setPriorities,
  setFocusBlocks,
  setLoading,
  setCalendarConnection,
} = calendarSlice.actions;

export default calendarSlice.reducer;
