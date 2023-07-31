/** @jest-environment node */
import weatherService from '../weather.service';

describe('weatherService', () => {
  let mockFetch: any;

  beforeEach(() => {
    mockFetch = jest.fn();
    global.fetch = <any>mockFetch;
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should get weather metadata', async () => {
    const mockResponse = {
      json: jest.fn().mockResolvedValueOnce({ data: 'mockMetadata' }),
    };
    mockFetch.mockResolvedValueOnce(mockResponse);

    const result = await weatherService.getWeatherMetadata({ lat: 51.1, lng: 45.3 });

    expect(mockFetch).toHaveBeenCalledWith('https://api.weather.gov/points/51.1,45.3', { next: { revalidate: 60 * 60 * 1000 } });
    expect(mockResponse.json).toHaveBeenCalled();
    expect(result).toEqual({ data: 'mockMetadata' });
  });

  it('should get weather forecast', async () => {
    const mockResponse = {
      json: jest.fn().mockResolvedValueOnce({ data: 'mockForecast' }),
    };
    mockFetch.mockResolvedValueOnce(mockResponse);

    const result = await weatherService.getWeatherForecast('https://api.weather.gov/forecast');

    expect(mockFetch).toHaveBeenCalledWith('https://api.weather.gov/forecast');
    expect(mockResponse.json).toHaveBeenCalled();
    expect(result).toEqual({ data: 'mockForecast' });
  });
});
