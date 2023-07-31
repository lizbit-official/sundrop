import { render, screen } from '@testing-library/react';
import DailyForecastCard from '@/components/weather/DailyForecastCard/DailyForecastCard';

describe('<DailyForecastCard /> Component', () => {
  const mockProps = {
    day: 'Monday',
    imageUrl: 'http://test-image-url.com',
    temperature: 75,
    precipProbability: 20,
    relativeHumidity: 50,
    forecastText: 'Sunny with a chance of rain',
  };

  it('renders correctly with provided props', () => {
    const { container } = render(<DailyForecastCard {...mockProps} />);

    expect(screen.getByAltText(`Daily forecast image for ${mockProps.day}`)).toBeInTheDocument();
    expect(screen.getByText(mockProps.day)).toBeInTheDocument();
    expect(screen.getByText(`${mockProps.temperature}`)).toBeInTheDocument();
    expect(screen.getByText(mockProps.forecastText)).toBeInTheDocument();
    expect(container).toHaveTextContent(`Precip${mockProps.precipProbability}%`);
    expect(container).toHaveTextContent(`Humidity${mockProps.relativeHumidity}%`);
  });
});
