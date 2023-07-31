/** @jest-environment node */
'server only';
import type { WeatherForecast, WeatherMetadata } from '@/services/weather/weather.types';
import type { LatLng } from '@/services/places/places.types';

/**
 * Weather API service client.
 */
const weatherService = {
  baseUrl: 'https://api.weather.gov',
  /**
   * Load the weather/forecast metadata for a location.
   */
  async getWeatherMetadata({ lat, lng }: LatLng): Promise<WeatherMetadata> {
    const response = await fetch(`${this.baseUrl}/points/${lat},${lng}`, {
      next: { revalidate: 60 * 60 * 1000 },
    });
    return response.json();
  },
  /**
   * Load a daily or hourly weather forecast (from a URL provided in metadata).
   */
  async getWeatherForecast(url: string): Promise<WeatherForecast> {
    const response = await fetch(url);
    return response.json();
  },
};

export default weatherService;
