/** @jest-environment node */
'server-only';
import type {
  GeocodeResponseData,
  ReverseGeocodeResponseData,
  PlaceAutocompleteResponse
} from '@googlemaps/google-maps-services-js';
import type { Place } from '@/services/places/places.types';

/**
 * Places service proxying the Google Maps API.
 */
const placesService = {
  baseURL: 'https://maps.googleapis.com/maps/api',
  apiKey: process.env.GOOGLE_MAPS_API_KEY,

  /**
   * Get Place Autocomplete results for the provided input string, from Google Maps API.
   *
   * @param searchInput {string} Text input to look up autocomplete results.
   * @return {PlaceAutocompleteResponse} Autocomplete response with `predictions` array.
   */
  async getPlaceAutocomplete(searchInput: string): Promise<PlaceAutocompleteResponse> {
    try {
      const res = await fetch(`${this.baseURL}/place/autocomplete/json?types=locality&fields=geometry.location&input=${searchInput}&components=country:us&key=${this.apiKey}`, {
        next: {
          revalidate: 60 * 60 * 1000,
        },
      });

      return res.json();
    }
    catch (err: any) {
      console.error(`Error proxying autocomplete lookup: ${err?.message || ''}`);
      throw err;
    }
  },

  /**
   * Get Place w/ Geocoded coordinates from a placeId.
   *
   * @param placeId {string} Maps Place ID to geocode.
   * @return {Place} Geocoded Place.
   */
  async getPlaceFromPlaceId(placeId: string): Promise<Place> {
    try {
      const res = await fetch(`${this.baseURL}/geocode/json?place_id=${placeId}&key=${this.apiKey}`, {
        next: {
          revalidate: 60 * 60 * 24 * 1000, // 24 hours
        },
      });
      const data: GeocodeResponseData = await res.json();

      const {
        results: [{
          geometry: { location },
          formatted_address,
          place_id,
        }],
      } = data;

      return <Place>{
        coords: location,
        placeId: place_id,
        name: formatted_address,
      };
    }
    catch (err: any) {
      console.error(`Error proxying geocode request: ${err?.message || ''}`);
      throw err;
    }
  },

  /**
   * Get Geocoded coordinates and a full place from a lat/lng pair.
   *
   * @param lat {string|number} Latitude component.
   * @param lng {string|number} Longitude component.
   * @return {Place} Geocoded Place.
   */
  async getGeocodeReverse(lat: string | number, lng: string | number): Promise<Place | null> {
    try {
      const res = await fetch(`${this.baseURL}/geocode/json?latlng=${lat},${lng}&result_type=locality&key=${this.apiKey}`, {
        next: {
          revalidate: 60 * 60 * 24 * 1000, // 24 hours
        },
      });

      const reverseGeocodeData: ReverseGeocodeResponseData = await res.json();

      if (reverseGeocodeData.results.length > 0) {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        const { place_id, formatted_address, geometry: { location } } = reverseGeocodeData.results[0];

        return <Place>({
          coords: location,
          placeId: place_id,
          name: formatted_address,
        });
      }
      else {
        return null;
      }
    }
    catch (err: any) {
      console.error(`Error proxying reverse geocode request: ${err?.message || ''}`);
      throw err;
    }
  },
};

export default placesService;
