import axios from 'axios';
import Constants from 'expo-constants';

class ThirdPartyService {
  private backendUrl = Constants.expoConfig?.extra?.EXPO_PUBLIC_BACKEND_URL;

  async requestUber(
    pickup: { lat: number; lng: number },
    destination: { lat: number; lng: number }
  ): Promise<any> {
    try {
      const response = await axios.post(`${this.backendUrl}/api/services/uber/request`, {
        pickup,
        destination,
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao solicitar Uber:', error);
      throw error;
    }
  }

  async searchFlights(from: string, to: string, date: string): Promise<any[]> {
    try {
      const response = await axios.get(`${this.backendUrl}/api/services/flights/search`, {
        params: { from, to, date },
      });
      return response.data.flights;
    } catch (error) {
      console.error('Erro ao buscar voos:', error);
      throw error;
    }
  }

  async searchHotels(location: string, checkIn: string, checkOut: string): Promise<any[]> {
    try {
      const response = await axios.get(`${this.backendUrl}/api/services/hotels/search`, {
        params: { location, checkIn, checkOut },
      });
      return response.data.hotels;
    } catch (error) {
      console.error('Erro ao buscar hotéis:', error);
      throw error;
    }
  }

  async orderFood(restaurantId: string, items: any[]): Promise<any> {
    try {
      const response = await axios.post(`${this.backendUrl}/api/services/food/order`, {
        restaurantId,
        items,
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao pedir comida:', error);
      throw error;
    }
  }
}

export default new ThirdPartyService();
