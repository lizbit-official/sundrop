import { mock } from 'jest-mock-extended';

export const mockGeolocationNotAvailable = () => {
  jest
    .spyOn(global.navigator.geolocation, 'getCurrentPosition')
    .mockImplementation((success, rejected) =>
      Promise.resolve(
        rejected
        ? rejected({
            ...mock<GeolocationPositionError>(),
            code: 0,
            message: '',
            PERMISSION_DENIED: 1,
            POSITION_UNAVAILABLE: 0,
            TIMEOUT: 0,
          })
        : void 0
      ),
    )
};

export const mockGeolocationAvailable = () => {
  jest
    .spyOn(global.navigator.geolocation, 'getCurrentPosition')
    .mockImplementation((success) =>
      Promise.resolve(
        success({
          ...mock<GeolocationPosition>(),
          coords: {
            ...mock<GeolocationCoordinates>(),
            latitude: 51.1,
            longitude: 45.3,
          },
        }),
      ),
    )
};
