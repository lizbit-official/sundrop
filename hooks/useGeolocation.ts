import { useCallback, useEffect, useState } from 'react';
import { LatLng } from '@/services/places/places.types';

export const useGeolocation = () => {
  const [isLocating, setIsLocating] = useState(false);
  const [locationCoords, setLocationCoords] = useState<LatLng>();
  const [errorMessage, setErrorMessage] = useState('');

  const getGeolocation = useCallback(() => {
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocationCoords({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setIsLocating(false);
      },
      (error) => {
        setErrorMessage(`Error retrieving location: ${error?.message}`);
        setIsLocating(false);
      },
    );
  }, []);

  useEffect(() => {
    if (!navigator.geolocation) {
      setErrorMessage('Geolocation is not supported by your browser.');
    }
  }, []);

  return {
    locationCoords,
    errorMessage,
    isLocating,
    getGeolocation,
  };
};
