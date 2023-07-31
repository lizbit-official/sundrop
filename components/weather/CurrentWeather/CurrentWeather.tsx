import React from 'react';
import Stat from '@/components/weather/Stat/Stat';
import styles from './CurrentWeather.module.scss';

interface CurrentWeatherProps {
  temperature: number;
  forecastText: string;
  precipProbability: number;
  relativeHumidity: number;
  dewpoint: number;
  wind: string;
}

const CurrentWeather = ({
  temperature,
  forecastText,
  precipProbability = 0,
  relativeHumidity = 0,
  dewpoint,
  wind
}: CurrentWeatherProps) => (
  <div className={styles.CurrentWeather}>
    <div className={styles.temperature}>
      <span>{temperature}</span>
      <span className={styles.unitDegrees}>&deg;</span>
    </div>

    <div>{forecastText}</div>

    <hr className={styles.divider} />

    <div className={styles.stats}>
      <Stat label="Precip Probability" value={precipProbability} unit="%" />
      <Stat label="Humidity" value={relativeHumidity} unit="%" />
      <Stat label="Dewpoint" value={dewpoint} unit="°" />
      <Stat label="Wind" value={wind} unit="mph" />
    </div>
  </div>
);

export default CurrentWeather;
