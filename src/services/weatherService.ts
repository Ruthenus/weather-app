import { WEATHER_API_KEY, WEATHER_API_URL } from "@/config/api";
import { Forecast, Weather } from "@/types/weather";

export async function getCurrentWeather(city: string): Promise<Weather> {
  const url = `${WEATHER_API_URL}/current.json?key=${WEATHER_API_KEY}&q=${city}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

export async function getForecastWeather(city: string): Promise<Forecast> {
  const url = `${WEATHER_API_URL}/forecast.json?key=${WEATHER_API_KEY}&q=${city}&days=3`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}
