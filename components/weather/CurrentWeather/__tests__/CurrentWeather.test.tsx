import { render, screen } from '@testing-library/react';
import CurrentWeather from '@/components/weather/CurrentWeather/CurrentWeather';

describe('<CurrentWeather /> Component', () => {
  it('should display weather data', () => {
    const props = {
      temperature: 20,
      forecastText: 'Mostly Sunny',
      precipProbability: 10,
      relativeHumidity: 60,
      dewpoint: 15,
      wind: 'N 10mph',
    };

    const { container } = render(<CurrentWeather {...props} />);

    expect(screen.getByText(`${props.temperature}`)).toBeInTheDocument();
    expect(screen.getByText(props.forecastText)).toBeInTheDocument();
    expect(container).toHaveTextContent(`Precip Probability${props.precipProbability}%`);
    expect(container).toHaveTextContent(`Humidity${props.relativeHumidity}%`);
    expect(container).toHaveTextContent(`Dewpoint${props.dewpoint}°`);
    expect(container).toHaveTextContent(`Wind${props.wind}`);
  });
});
