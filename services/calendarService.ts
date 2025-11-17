import axios from 'axios';
import Constants from 'expo-constants';

interface CalendarEvent {
  id: string;
  title: string;
  startTime: Date;
  endTime: Date;
  description?: string;
  priority?: 'high' | 'medium' | 'low';
  source: 'google' | 'outlook';
}

class CalendarService {
  private backendUrl = Constants.expoConfig?.extra?.EXPO_PUBLIC_BACKEND_URL;

  async authenticateGoogle(): Promise<string> {
    try {
      const response = await axios.post(`${this.backendUrl}/api/auth/google`);
      return response.data.accessToken;
    } catch (error) {
      console.error('Erro ao autenticar com Google:', error);
      throw error;
    }
  }

  async authenticateOutlook(): Promise<string> {
    try {
      const response = await axios.post(`${this.backendUrl}/api/auth/outlook`);
      return response.data.accessToken;
    } catch (error) {
      console.error('Erro ao autenticar com Outlook:', error);
      throw error;
    }
  }

  async fetchGoogleEvents(accessToken: string): Promise<CalendarEvent[]> {
    try {
      const response = await axios.get(`${this.backendUrl}/api/calendar/google/events`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      return response.data.events;
    } catch (error) {
      console.error('Erro ao buscar eventos do Google:', error);
      throw error;
    }
  }

  async fetchOutlookEvents(accessToken: string): Promise<CalendarEvent[]> {
    try {
      const response = await axios.get(`${this.backendUrl}/api/calendar/outlook/events`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      return response.data.events;
    } catch (error) {
      console.error('Erro ao buscar eventos do Outlook:', error);
      throw error;
    }
  }

  async createFocusBlock(
    accessToken: string,
    source: 'google' | 'outlook',
    event: Partial<CalendarEvent>
  ): Promise<CalendarEvent> {
    try {
      const response = await axios.post(
        `${this.backendUrl}/api/calendar/${source}/create-focus-block`,
        event,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      return response.data.event;
    } catch (error) {
      console.error('Erro ao criar bloco de foco:', error);
      throw error;
    }
  }

  calculateFocusBlocks(events: CalendarEvent[], priorities: string[]): CalendarEvent[] {
    return [];
  }
}

export default new CalendarService();
