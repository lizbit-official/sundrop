'server only';
import React from 'react';
import PlaceAutocompleteInput from '@/components/controls/PlaceAutocompleteInput/PlaceAutocompleteInput';
import CurrentWeather from '@/components/weather/CurrentWeather/CurrentWeather';
import DailyForecast from '@/components/weather/DailyForecast/DailyForecast';
import ErrorComponent from '@/app/error';
import { Place } from '@/services/places/places.types';
import weatherService from '@/services/weather/weather.service';
import styles from './WeatherDashboard.module.scss';

export const revalidate = 0;

interface WeatherDashboardProps {
  place?: Place | null;
  errorMessage?: string | null;
}

const WeatherDashboard = async ({ place, errorMessage }: WeatherDashboardProps = {}) => {
  const metadata = place?.coords ? await weatherService.getWeatherMetadata(place.coords) : null;
  const forecast = metadata?.properties ? await weatherService.getWeatherForecast(metadata.properties.forecast) : null;
  const forecastHourly = metadata?.properties ? await weatherService.getWeatherForecast(metadata.properties.forecastHourly) : null;

  const curWeather = forecastHourly?.properties?.periods?.[0];

  // ugly way to check error with retrieving forecast - todo: this should be handled by the component gracefully
  // @ts-ignore
  const noWeatherAvailable = (place && (forecast?.status === 503 || !forecast?.properties));

  return (
    <div className={styles.WeatherDashboard}>
      <header className={styles.header}>
        {/* Branding */}
        <div className={styles.branding}>Sundrop</div>

        {/* Place search input */}
        <PlaceAutocompleteInput place={place ?? null} />
      </header>

      {/* Error Message (re: place lookup) - From Router */}
      {errorMessage && (
        <ErrorComponent
          error={{ name: 'error', message: errorMessage }}
          reset={() => { window.location.reload(); }}
        />
      )}

      {/* Current Weather */}
      <div className={styles.currentWeatherContainer}>
        {noWeatherAvailable && (
          <div>Sorry, the forecast could not be loaded for the selected location.</div>
        )}
        {curWeather && (
          <CurrentWeather
            temperature={curWeather.temperature}
            forecastText={curWeather.shortForecast}
            precipProbability={curWeather.probabilityOfPrecipitation.value}
            relativeHumidity={curWeather.relativeHumidity.value}
            dewpoint={(curWeather.dewpoint.value * 9/5) + 32}
            wind={`${curWeather.windDirection} ${curWeather.windSpeed?.split(' ')[0]}`}
          />
        )}
      </div>

      {/* Weekly Forecast */}
      <div className={styles.dailyForecastContainer}>
        {forecast && (
          <DailyForecast forecast={forecast} />
        )}
      </div>
    </div>
  );
};

export default WeatherDashboard;
