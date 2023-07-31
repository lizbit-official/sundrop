import WeatherDashboard from '@/components/weather/WeatherDashboard/WeatherDashboard';
import placesService from '@/services/places/places.service';
import { Place } from '@/services/places/places.types';

const Page = async ({ params }: { params: { slug: string }}) => {
  const placeId = params.slug;
  let place: Place | null = null;
  let placeErrorMessage: string | null = null;

  try {
    place = await placesService.getPlaceFromPlaceId(placeId);
  }
  catch (err: any) {
    console.error(`Error retrieving place data: ${err?.message ?? ''}`);
    placeErrorMessage = 'Error retrieving place data';
  }

  return (
    <WeatherDashboard place={place} errorMessage={placeErrorMessage} />
  );
};

export default Page;
