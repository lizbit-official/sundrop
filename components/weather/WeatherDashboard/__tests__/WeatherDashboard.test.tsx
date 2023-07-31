import { render, screen } from '@testing-library/react';
import WeatherDashboard from '@/components/weather/WeatherDashboard/WeatherDashboard';
import type { Place } from '@/services/places/places.types';

jest.mock('next/navigation', () => ({
  __esModule: true,
  useRouter: jest.fn(),
}));

describe('WeatherDashboard', () => {
  let mockFetch: any;
  const mockPlace: Place = {
    placeId: 'ChIJmSL6xEJizYcRDaBloxhcbcE',
    name: 'Conway, AR, USA',
    coords: { lat: 35.0917506, lng: -92.4366522 },
  };

  beforeEach(() => {
    mockFetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({}),
      })
    );
    global.fetch = mockFetch;
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('renders the basics without a place', async () => {
    const jsx = await WeatherDashboard({});
    render(jsx);

    expect(screen.getByRole('banner')).toHaveTextContent('Sundrop');
    expect(screen.getByRole('button')).toHaveTextContent('Use Current Location');
  });

  it('renders current and forecast with a place', async () => {
    const jsx = await WeatherDashboard({ place: mockPlace });
    render(jsx);

    expect(screen.getByText('Conway, AR, USA')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveTextContent('Change Location');

    // TODO: check current weather and forecast!
  });
});
