/** @jest-environment node */
'server-only';
import { NextResponse } from 'next/server';
import placesService from '@/services/places/places.service';

/**
 * GET /api/places/autocomplete
 *
 * @summary handler to proxy place autocomplete lookups through the Maps API.
 * @param request.query.searchInput {string} Search input text.
 * @return {google.maps.places.AutocompleteResponse} 200 - Successful response with predictions.
 * @return {object} 400 - Bad request, if `searchInput` query param is empty.
 * @return {object} 503 - Error proxying to upstream Maps API endpoint.
 */
export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const searchInput = searchParams.get('searchInput');

  if (!searchInput) {
    return NextResponse.json(
      { message: 'searchInput is required' },
      { status: 400 },
    );
  }

  try {
    const results = await placesService.getPlaceAutocomplete(searchInput ?? '');
    return NextResponse.json(results, { status: 200 });
  }
  catch (err: any) {
    console.error(`Failed to retrieve autocomplete results: ${err?.message}`);

    return NextResponse.json(
      { message: 'Service temporarily unavailable' },
      {
        status: 503,
        headers: { 'Retry-After': '30' },
      }
    );
  }

};
