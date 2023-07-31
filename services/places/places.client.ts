/// <reference types="@types/google.maps" />
import { QueryClient } from '@tanstack/query-core';
import type { LatLng, Place } from '@/services/places/places.types';

const defaultQueryClient = new QueryClient();

const locationEndpoint = '/api/places';

/**
 * Places service client wrapping the
 * autocomplete and reverse-geocode API endpoints.
 */
export const placesClient = {
  /**
   * Load autocomplete results for user's place search input.
   *
   * @param searchInput {string} Search input string for which to get autocomplete results.
   * @return {AutocompleteResponse}
   */
  async getAutocompleteResults(searchInput: string): Promise<google.maps.places.AutocompleteResponse> {
    const response = await fetch(`${locationEndpoint}/autocomplete?searchInput=${searchInput}`);
    return await response.json();
  },
  /**
   * "Reverse Geocode", or retrieve place data for, a pair of coordinates.
   *
   * @param coords.lat Latitude component.
   * @param coords.lng Longitude component.
   * @param coords Coordinate for which to perform a reverse geocode.
   * @return {Place}
   */
  async getPlaceFromCoordinates({ lat, lng }: LatLng): Promise<Place> {
    const response = await fetch(`${locationEndpoint}/geocode-reverse?lat=${lat}&lng=${lng}`);
    return await response.json();
  },
};

export const getAutocompleteResultsQuery = async (
  searchInput: string,
  queryClient = defaultQueryClient
): Promise<google.maps.places.AutocompletePrediction[]> => {
  const response: google.maps.places.AutocompleteResponse = await queryClient.fetchQuery({
    queryKey: ['autocomplete-results', searchInput],
    queryFn: () => searchInput ? placesClient.getAutocompleteResults(searchInput) : null,
    staleTime: 60 * 60 * 1000,
  });

  return response.predictions;
};

export const getPlaceFromCoordinatesQuery = async (
  coords: LatLng,
  queryClient = defaultQueryClient
): Promise<Place> => {
  return queryClient.fetchQuery({
    queryKey: ['coordinates-place', coords],
    queryFn: () => placesClient.getPlaceFromCoordinates(coords),
    staleTime: 60 * 60 * 1000,
  });
};
