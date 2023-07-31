import React from 'react';
import DailyForecastCard from '../DailyForecastCard/DailyForecastCard';
import { WeatherForecast, WeatherPeriod } from '@/services/weather/weather.types';
import styles from './DailyForecast.module.scss';

interface DailyForecastProps {
  forecast: WeatherForecast | null;
}

const DailyForecast = ({ forecast }: DailyForecastProps) => {
  let today: WeatherPeriod | null = null;
  let tonight: WeatherPeriod | null = null;
  let periods = forecast?.properties?.periods;

  // isolate "today" and "tonight", if present, to ensure rendering order
  if (forecast?.properties?.periods?.[0]?.name === 'Today') {
    today = forecast?.properties.periods[0];
    tonight = forecast?.properties.periods[1];
    periods = forecast?.properties?.periods?.slice(2);
  }
  else if (forecast?.properties?.periods?.[0]?.name?.match(/night/i)) {
    tonight = forecast?.properties.periods[0];
    periods = forecast?.properties?.periods?.slice(1);
  }

  return (
    <div className={styles.DailyForecast}>
      {/* Today and Tonight */}
      {today ? (
        <DailyForecastCard
          key={today.name}
          day={today.name}
          imageUrl={today.icon}
          temperature={today.temperature}
          precipProbability={today.probabilityOfPrecipitation.value}
          relativeHumidity={today.relativeHumidity.value}
          forecastText={today.shortForecast}
        />
      ) : <div></div>}

      {tonight ? (
        <DailyForecastCard
          key={tonight.name}
          day={tonight.name}
          imageUrl={tonight.icon}
          temperature={tonight.temperature}
          precipProbability={tonight.probabilityOfPrecipitation.value}
          relativeHumidity={tonight.relativeHumidity.value}
          forecastText={tonight.shortForecast}
        />
      ) : <div className="nightCard"></div>}

      {periods?.map((day) => (
        <DailyForecastCard
          key={day.name}
          day={day.name}
          imageUrl={day.icon}
          temperature={day.temperature}
          precipProbability={day.probabilityOfPrecipitation.value}
          relativeHumidity={day.relativeHumidity.value}
          forecastText={day.shortForecast}
        />
      ))}
    </div>
  );
};

export default DailyForecast;
