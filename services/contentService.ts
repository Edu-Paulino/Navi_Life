import axios from 'axios';
import Constants from 'expo-constants';

interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  source: string;
  url: string;
  publishedAt: Date;
  category: string;
}

class ContentService {
  private apiKey = Constants.expoConfig?.extra?.EXPO_PUBLIC_NEWS_API_KEY;
  private backendUrl = Constants.expoConfig?.extra?.EXPO_PUBLIC_BACKEND_URL;

  async fetchNews(topics: string[]): Promise<NewsArticle[]> {
    try {
      const response = await axios.post(`${this.backendUrl}/api/content/fetch-news`, {
        topics,
      });
      return response.data.articles;
    } catch (error) {
      console.error('Erro ao buscar notícias:', error);
      throw error;
    }
  }

  async generateSummary(articles: NewsArticle[]): Promise<NewsArticle[]> {
    try {
      const response = await axios.post(`${this.backendUrl}/api/content/summarize`, {
        articles,
      });
      return response.data.summarized;
    } catch (error) {
      console.error('Erro ao gerar resumo:', error);
      throw error;
    }
  }
}

export default new ContentService();
