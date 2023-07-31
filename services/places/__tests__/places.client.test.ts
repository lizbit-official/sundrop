import { placesClient, getAutocompleteResultsQuery, getPlaceFromCoordinatesQuery } from '@/services/places/places.client';
import { QueryClient } from '@tanstack/query-core';

jest.mock('@tanstack/query-core');

const queryClient = new QueryClient();

describe('placesClient', () => {
  let mockFetch: any;

  beforeEach(() => {
    mockFetch = jest.fn();
    global.fetch = mockFetch as any;
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should get autocomplete results', async () => {
    const mockResponse = { json: jest.fn().mockResolvedValueOnce({ predictions: ['mockPrediction1', 'mockPrediction2'] }) };
    mockFetch.mockResolvedValueOnce(mockResponse);

    const result = await placesClient.getAutocompleteResults('Seattle');

    expect(mockFetch).toHaveBeenCalledWith('/api/places/autocomplete?searchInput=Seattle');
    expect(mockResponse.json).toHaveBeenCalled();
    expect(result).toEqual({ predictions: ['mockPrediction1', 'mockPrediction2'] });
  });

  it('should get place from coordinates', async () => {
    const mockResponse = { json: jest.fn().mockResolvedValueOnce({ place: 'mockPlace' }) };
    mockFetch.mockResolvedValueOnce(mockResponse);

    const result = await placesClient.getPlaceFromCoordinates({ lat: 47.6062, lng: 122.3321 });

    expect(mockFetch).toHaveBeenCalledWith('/api/places/geocode-reverse?lat=47.6062&lng=122.3321');
    expect(mockResponse.json).toHaveBeenCalled();
    expect(result).toEqual({ place: 'mockPlace' });
  });
});

describe('placesClient queries', () => {
  let mockQueryClient = <jest.Mocked<typeof queryClient>>queryClient;

  afterAll(() => {
    jest.resetAllMocks();
  });

  it('should get autocomplete results query', async () => {
    const mockPredictions = ['mockPrediction1', 'mockPrediction2'];
    mockQueryClient.fetchQuery.mockResolvedValueOnce({ predictions: mockPredictions });

    const result = await getAutocompleteResultsQuery('Seattle', mockQueryClient);

    expect(mockQueryClient.fetchQuery).toHaveBeenCalled();
    expect(result).toEqual(mockPredictions);
  });

  it('should get place from coordinates query', async () => {
    const mockPlace = { place: 'mockPlace' };
    mockQueryClient.fetchQuery.mockResolvedValueOnce(mockPlace);

    const result = await getPlaceFromCoordinatesQuery({ lat: 47.6062, lng: 122.3321 }, mockQueryClient);

    expect(mockQueryClient.fetchQuery).toHaveBeenCalled();
    expect(result).toEqual(mockPlace);
  });
});
