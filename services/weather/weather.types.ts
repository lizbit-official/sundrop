export interface WeatherLocationGeometry {
  type: string;
  coordinates: [lat: number, lng: number][];
}

export interface WeatherScalar {
  unitCode: string;
  value: number;
}

export interface WeatherMetadataGeometry {
  type: string;
  coordinates: [lat: number, lng: number];
}

export interface WeatherMetadata {
  id: string;
  type: string;
  geometry: WeatherMetadataGeometry;
  properties: {
    cwa: string;
    forecastOffice: string;
    gridId: string;
    gridX: number;
    gridY: number;
    forecast: string;
    forecastHourly: string;
    forecastGridData: string;
    observationStations: string;
    relativeLocation: {
      type: string;
      geometry: WeatherMetadataGeometry;
      properties: {
        city: string;
        state: string;
        distance: WeatherScalar;
        bearing: WeatherScalar;
      };
    };
    forecastZone: string;
    county: string;
    fireWeatherZone: string;
    timeZone: string;
    radarStation: string;
  };
}

export interface WeatherPeriod {
  number: number;
  name: string;
  startTime: string;
  endTime: string;
  isDaytime: boolean;
  temperature: number;
  temperatureUnit: string;
  temperatureTrend: any;
  probabilityOfPrecipitation: WeatherScalar;
  dewpoint: WeatherScalar;
  relativeHumidity: WeatherScalar;
  windSpeed: string;
  windDirection: string;
  icon: string; // url
  shortForecast: string;
  detailedForecast: string;
}

export interface WeatherForecastProperties {
  updated: string;
  units: string;
  forecastGenerator: string;
  generatedAt: string;
  updateTime: string;
  validTimes: string;
  elevation: WeatherScalar;
  periods: WeatherPeriod[];
}

export interface WeatherForecast {
  type: string;
  geometry: WeatherLocationGeometry;
  properties: WeatherForecastProperties;
}


