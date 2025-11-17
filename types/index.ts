export interface CalendarEvent {
  id: string;
  title: string;
  startTime: Date;
  endTime: Date;
  description?: string;
  priority?: 'high' | 'medium' | 'low';
  source: 'google' | 'outlook';
  isFocusBlock?: boolean;
}

export interface ContentItem {
  id: string;
  title: string;
  summary: string;
  source: string;
  url: string;
  publishedAt: Date;
  category: string;
}

export interface VoiceCommand {
  command: string;
  intent: string;
  parameters: any;
}
