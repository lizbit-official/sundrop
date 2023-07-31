/** @jest-environment node */
'server-only';
import { NextResponse } from 'next/server';
import placesService from '@/services/places/places.service';

/**
 * GET /api/places/geocode-reverse
 *
 * @summary Perform and return a reverse geocode, proxying the Maps API.
 * @param request.query.lat {string} Latitude component of location.
 * @param request.query.lng {string} Longitude component of location.
 * @return {Place | null} 200 - Successful response with Place data.
 * @return {object} 400 - Bad request, either `lat` or `lng` are missing from query.
 * @return {object} 503 - Error proxying to upstream Maps API endpoint.
 */
export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');

  // validate request
  if (!lat || !lng) {
    return NextResponse.json(
      { message: 'Invalid request, please provide both `lat` and `lng`.' },
      { status: 400 },
    );
  }

  // retrieve reverse geocode
  try {
    const results = await placesService.getGeocodeReverse(lat ?? '', lng ?? '');

    return NextResponse.json(results, { status: 200 });
  }
  catch (err: any) {
    console.error(`Failed to retrieve reverse geocode: ${err?.message}`);

    return NextResponse.json(
      { message: 'Service temporarily unavailable' },
      {
        status: 503,
        headers: { 'Retry-After': '30' },
      }
    );
  }
};
