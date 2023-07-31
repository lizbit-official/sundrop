export interface LatLng {
  lat: number;
  lng: number;
}

export interface Place {
  placeId: string; // google place id
  name: string; // city name
  coords: LatLng;
}
