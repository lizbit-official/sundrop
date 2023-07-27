import React, { useEffect, useState } from 'react';

type LocationCoordinates = {
  latitude: number;
  longitude: number;
} | null;

export const useGeolocation = () => {
  const [statusMessage, setStatusMessage] = useState('');
  const [coords, setCoords] = useState<LocationCoordinates>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setStatusMessage('Geolocation is not supported by your browser.');
    }
    else {
      setStatusMessage('Locating...');
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoords(position.coords);

          // watch
          navigator.geolocation.watchPosition(
            (newPosition) => {
              setCoords(position.coords);
            },
            (error) => {
              setStatusMessage(`Error retrieving location: ${error?.message}`);
            },
          );

        },
        (error) => {
          //setCoords(null); // todo: needed?
          setStatusMessage(`Error retrieving location: ${error?.message}`);
        },
      )
    }
  }, []);

  return {
    statusMessage,
    coords,
  };
};
