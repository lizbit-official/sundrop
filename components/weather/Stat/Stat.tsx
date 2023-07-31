import React from 'react';
import cx from 'classnames';
import styles from './Stat.module.scss';

export interface StatProps {
  label?: string;
  value: string | number;
  unit?: string;
  size?: 'sm' | 'lg';
}

const Stat = ({ label, value, unit, size = 'lg' }: StatProps) => (
  <div className={cx(styles.Stat, styles[`size-${size}`])}>
    {label && <div className={styles.label} aria-label={label}>{label}</div>}
    <div className={styles.value}>
      <span>{value}</span>
      {unit && (
        <span
          className={cx(styles.unit, {
            [styles.top]: unit === '°',
          })}
        >{unit}</span>
      )}
    </div>
  </div>
);

export default Stat;
