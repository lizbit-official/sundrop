/** @jest-environment node */
import placesService from '@/services/places/places.service';
import { readableStreamToString } from '@/test-utils/api-utils';
import { GET } from '@/app/api/places/autocomplete/route';

jest.mock('@/services/places/places.service');

describe('GET /api/places/autocomplete', () => {
  const mockPlacesService = placesService as jest.Mocked<typeof placesService>;

  it('should return 200 status code with results', async () => {
    const mockRequest = new Request('http://localhost/places/autocomplete?searchInput=San%20Fr');
    const mockResults = { test: 'results' };
    mockPlacesService.getPlaceAutocomplete.mockResolvedValueOnce(<any>mockResults);

    const response = await GET(mockRequest);

    expect(response.status).toBe(200);
    const body = await readableStreamToString(response.body!);
    expect(JSON.parse(body)).toEqual(mockResults);
  });

  it('should return 400 status code when searchInput is empty', async () => {
    const mockRequest = new Request('http://localhost/places/autocomplete?searchInput=');
    const response = await GET(mockRequest);

    expect(response.status).toEqual(400);
  });

  it('should return 503 status code when placesService throws an error', async () => {
    const mockRequest = new Request('http://localhost/places/autocomplete?searchInput=San%20Fr');
    mockPlacesService.getPlaceAutocomplete.mockRejectedValueOnce(new Error('Service down'));

    const response = await GET(mockRequest);

    expect(response.status).toBe(503);
    expect(response.headers.get('Retry-After')).toBe('30');
  });
});
