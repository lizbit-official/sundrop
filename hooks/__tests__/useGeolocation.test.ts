import { renderHook, act, waitFor } from '@testing-library/react';
import { useGeolocation } from '@/hooks/useGeolocation';

describe('useGeolocation', () => {
  let mockGeolocation: any;

  beforeEach(() => {
    mockGeolocation = {
      getCurrentPosition: jest.fn().mockImplementationOnce((success) => {
        success({
          coords: {
            latitude: 51.1,
            longitude: 45.3,
          },
        });
      }),
      watchPosition: jest.fn()
    };

    // @ts-ignore
    // noinspection JSConstantReassignment
    global.navigator.geolocation = mockGeolocation;
  });

  it('should get geolocation when getGeolocation is called', async () => {
    const { result } = renderHook(() => useGeolocation());

    act(() => {
      result.current.getGeolocation();
    });

    await waitFor(() => {
      expect(global.navigator.geolocation.getCurrentPosition).toHaveBeenCalled();
    });

    expect(result.current.locationCoords).toEqual({
      lat: 51.1,
      lng: 45.3
    });
    expect(result.current.isLocating).toBe(false);
  });

  it('should set error message when getCurrentPosition fails', async () => {
    global.navigator.geolocation.getCurrentPosition = jest.fn().mockImplementationOnce(
      (_: PositionCallback, error: PositionErrorCallback) => {
        Promise.resolve(error({
          message: 'User denied Geolocation',
          code: 1,
          PERMISSION_DENIED: 1,
          POSITION_UNAVAILABLE: 2,
          TIMEOUT: 3,
        }));
      }
    );

    const { result } = renderHook(() => useGeolocation());

    act(() => {
      result.current.getGeolocation();
    });

    await waitFor(() => {
      expect(mockGeolocation.getCurrentPosition).toHaveBeenCalled();
    });

    expect(result.current.errorMessage).toEqual('Error retrieving location: User denied Geolocation');
    expect(result.current.isLocating).toBe(false);
  });
});
