import axios from 'axios';
import Constants from 'expo-constants';

class DialogflowService {
  private projectId = Constants.expoConfig?.extra?.EXPO_PUBLIC_DIALOGFLOW_PROJECT_ID;
  private backendUrl = Constants.expoConfig?.extra?.EXPO_PUBLIC_BACKEND_URL;

  async detectIntent(text: string, sessionId: string): Promise<any> {
    try {
      const response = await axios.post(`${this.backendUrl}/api/dialogflow/detect-intent`, {
        text,
        sessionId,
        languageCode: 'pt-BR',
      });

      return response.data;
    } catch (error) {
      console.error('Erro ao detectar intenção:', error);
      throw error;
    }
  }

  parseResponse(response: any): { intent: string; parameters: any; fulfillmentText: string } {
    return {
      intent: response.queryResult?.intent?.displayName || 'unknown',
      parameters: response.queryResult?.parameters || {},
      fulfillmentText: response.queryResult?.fulfillmentText || 'Desculpe, não entendi.',
    };
  }
}

export default new DialogflowService();
