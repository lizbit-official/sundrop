import { render, screen } from '@testing-library/react';
import DailyForecast from '@/components/weather/DailyForecast/DailyForecast';

describe('<DailyForecast /> Component', () => {
  it('should display daily forecast data', () => {
    const forecast = {
      properties: {
        periods: [
          {
            name: 'Today',
            icon: 'http://example.com/icon.png',
            temperature: 20,
            probabilityOfPrecipitation: { value: 10 },
            relativeHumidity: { value: 60 },
            shortForecast: 'Mostly Sunny',
          },
          {
            name: 'Tonight',
            icon: 'http://example.com/icon.png',
            temperature: 15,
            probabilityOfPrecipitation: { value: 10 },
            relativeHumidity: { value: 60 },
            shortForecast: 'Partly Cloudy',
          },
        ],
      },
    };

    // @ts-ignore
    render(<DailyForecast forecast={forecast} />);

    expect(screen.getByText('Today')).toBeInTheDocument();
    expect(screen.getByText('Mostly Sunny')).toBeInTheDocument();
    expect(screen.getByText('Tonight')).toBeInTheDocument();
    expect(screen.getByText('Partly Cloudy')).toBeInTheDocument();
  });

  it('should handle null forecast', () => {
    render(<DailyForecast forecast={null} />);

    expect(screen.queryByText('Today')).not.toBeInTheDocument();
    expect(screen.queryByText('Tonight')).not.toBeInTheDocument();
  });
});
