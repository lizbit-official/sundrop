import React from 'react';
import cx from 'classnames';
import Stat from '../Stat/Stat';
import styles from './DailyForecastCard.module.scss';

interface DailyForecastCardProps {
  day: string;
  imageUrl: string;
  temperature: number;
  precipProbability?: number;
  relativeHumidity: number;
  forecastText: string;
}

const DailyForecastCard = ({
  day,
  imageUrl,
  temperature,
  precipProbability,
  relativeHumidity,
  forecastText
}: DailyForecastCardProps) => (
  <div className={cx(styles.DailyForecastCard, day.match(/night/i) ? styles.nightCard : styles.dayCard)}>
    {/* Top: Image, Day, Forecast, and Temperature */}
    <div className={styles.top}>
      {/* Image from NOAA */}
      <img alt={`Daily forecast image for ${day}`} src={imageUrl} />

      <div className={styles.topDetails}>
        <div className={styles.day}>{day}</div>
        <Stat value={temperature} unit="&deg;" />
      </div>
    </div>

    <div className={styles.forecastText}>{forecastText}</div>

    {/* Bottom: Stats */}
    <div className={styles.bottom}>
      <Stat label="Precip" value={precipProbability ?? 0} unit="%" size="sm" />
      <Stat label="Humidity" value={relativeHumidity ?? 0} unit="%" size="sm" />
    </div>
  </div>
);

export default DailyForecastCard;
