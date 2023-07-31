/** @jest-environment node */
import placesService from '@/services/places/places.service';
import { readableStreamToString } from '@/test-utils/api-utils';
import type { Place } from '@/services/places/places.types';
import { GET } from '@/app/api/places/geocode-reverse/route';

jest.mock('@/services/places/places.service');

describe('GET /api/places/geocode-reverse', () => {
  const mockPlacesService = placesService as jest.Mocked<typeof placesService>;

  it('should return 200 status code with results when lat + lng are provided and service does not error', async () => {
    const mockRequest = new Request('http://localhost/api/places/geocode-reverse?lat=40.714224&lng=-73.961452');
    const mockResults: Place = { coords: { lat: 40.714, lng: -73.965}, placeId: '00001', name: 'New York, NY' };
    mockPlacesService.getGeocodeReverse.mockResolvedValueOnce(mockResults);

    const response = await GET(mockRequest);

    expect(response.status).toBe(200);
    const body = await readableStreamToString(response.body!);
    expect(JSON.parse(body)).toEqual(mockResults);
  });

  it('should return 400 status code when lat or lng is not provided', async () => {
    const mockRequest = new Request('http://localhost/api/places/geocode-reverse?lat=40.714224');
    const response = await GET(mockRequest);

    expect(response.status).toEqual(400);
  });

  it('should return 503 status code when placesService throws an error', async () => {
    const mockRequest = new Request('http://localhost/api/places/geocode-reverse?lat=40.714224&lng=-73.961452');
    mockPlacesService.getGeocodeReverse.mockRejectedValueOnce(new Error('Service down'));

    const response = await GET(mockRequest);

    expect(response.status).toBe(503);
    expect(response.headers.get('Retry-After')).toBe('30');
  });
});
