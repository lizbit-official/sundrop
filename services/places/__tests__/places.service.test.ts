/** @jest-environment node */
import placesService from '@/services/places/places.service';

describe('placesService', () => {
  let mockFetch: any;

  beforeEach(() => {
    mockFetch = jest.fn();
    global.fetch = <any>mockFetch;
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should get place autocomplete results', async () => {
    const mockResponse = {
      json: jest.fn().mockResolvedValueOnce({ predictions: ['mockPrediction1', 'mockPrediction2'] }),
    };
    mockFetch.mockResolvedValueOnce(mockResponse);

    const result = await placesService.getPlaceAutocomplete('Seattle');

    expect(mockFetch).toHaveBeenCalledWith(
      // eslint-disable-next-line max-len
      'https://maps.googleapis.com/maps/api/place/autocomplete/json?types=locality&fields=geometry.location&input=Seattle&components=country:us&key=undefined',
      { next: { revalidate: 60 * 60 * 1000 },
    });
    expect(mockResponse.json).toHaveBeenCalled();
    expect(result).toEqual({ predictions: ['mockPrediction1', 'mockPrediction2'] });
  });

  it('should get place from place id', async () => {
    const mockResponse = {
      json: jest.fn().mockResolvedValueOnce({
        results: [{ geometry: { location: 'mockLocation' }, formatted_address: 'mockAddress', place_id: 'mockPlaceId' }]
      }),
    };
    mockFetch.mockResolvedValueOnce(mockResponse);

    const result = await placesService.getPlaceFromPlaceId('place123');

    expect(mockFetch).toHaveBeenCalledWith(
      'https://maps.googleapis.com/maps/api/geocode/json?place_id=place123&key=undefined',
      { next: { revalidate: 60 * 60 * 24 * 1000 },
    });
    expect(mockResponse.json).toHaveBeenCalled();
    expect(result).toEqual({ coords: 'mockLocation', name: 'mockAddress', placeId: 'mockPlaceId' });
  });

  it('should get geocode reverse', async () => {
    const mockResponse = {
      json: jest.fn().mockResolvedValueOnce({
        results: [{ place_id: 'mockPlaceId', formatted_address: 'mockAddress', geometry: { location: 'mockLocation' } }]
      }),
    };
    mockFetch.mockResolvedValueOnce(mockResponse);

    const result = await placesService.getGeocodeReverse(47.6062, 122.3321);

    expect(mockFetch).toHaveBeenCalledWith(
      'https://maps.googleapis.com/maps/api/geocode/json?latlng=47.6062,122.3321&result_type=locality&key=undefined',
      { next: { revalidate: 60 * 60 * 24 * 1000 },
    });
    expect(mockResponse.json).toHaveBeenCalled();
    expect(result).toEqual({ coords: 'mockLocation', name: 'mockAddress', placeId: 'mockPlaceId' });
  });
});
