export interface Location {
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  localtime: string;
}

export interface Condition {
  text: string;
  icon: string;
  code: number;
}

export interface Current {
  last_updated: string;
  temp_c: number;
  feelslike_c: number;
  humidity: number;
  wind_kph: number;
  wind_dir: string;
  pressure_mb: number;
  vis_km: number;
  uv: number;
  cloud: number;
  condition: Condition;
  is_day: number;
}

export interface Weather {
  location: Location;
  current: Current;
}

export interface Day {
  maxtemp_c: number;
  mintemp_c: number;
  avgtemp_c: number;
  maxwind_kph: number;
  totalprecip_mm: number;
  totalsnow_cm: number;
  avghumidity: number;
  daily_chance_of_rain: number;
  daily_will_it_snow: number;
  condition: Condition;
  uv: number;
}

export interface Astro {
  sunrise: string;
  sunset: string;
  moonrise: string;
  moonset: string;
  moon_phase: string;
}

export interface ForecastDay {
  date: string;
  day: Day;
  astro: Astro;
}

export interface Forecast {
  location: Location;
  current: Current;
  forecast: {
    forecastday: ForecastDay[];
  };
}
