import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import { getAutocompleteResultsQuery, getPlaceFromCoordinatesQuery } from '@/services/places/places.client';
import { useGeolocation } from '@/hooks/useGeolocation';
import PlaceAutocompleteInput from '@/components/controls/PlaceAutocompleteInput/PlaceAutocompleteInput';

jest.mock('next/navigation', () => ({
  __esModule: true,
  useRouter: jest.fn(),
}));

jest.mock('ahooks', () => ({
  useLocalStorageState: jest.fn().mockReturnValue(['place123', jest.fn()]),
}));

jest.mock('@/services/places/places.client', () => ({
  getAutocompleteResultsQuery: jest.fn(),
  getPlaceFromCoordinatesQuery: jest.fn().mockResolvedValueOnce({ placeId: 'place123' }),
}));

jest.mock('@/hooks/useGeolocation', () => ({
  useGeolocation: jest.fn(),
}));

describe('<PlaceAutocompleteInput /> Component', () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
    (getAutocompleteResultsQuery as jest.Mock).mockResolvedValueOnce([]);
    (getPlaceFromCoordinatesQuery as jest.Mock).mockResolvedValueOnce({ placeId: 'place123' });
    (useGeolocation as jest.Mock).mockReturnValue({
      locationCoords: { lat: 43.02, lng: -70.23 },
      errorMessage: '',
      isLocating: false,
      getGeolocation: jest.fn(),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render and handle interactions', async () => {
    render(<PlaceAutocompleteInput place={null} />);

    expect(screen.getByText('Use Current Location')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Use Current Location'));

    await waitFor(() => expect(mockPush).toHaveBeenCalledWith('/place123'));

    fireEvent.click(screen.getByText('Change Location'));

    await waitFor(() => {
      screen.getByText('Loading place data...');
    }, { timeout: 2000 });

    // todo: finish router test
  });
});
