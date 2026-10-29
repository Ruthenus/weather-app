import { WEATHER_API_URL, WEATHER_API_KEY } from "@/config/api";
import { Weather } from "@/types/weather";

export async function getCurrentWeather(city: string): Promise<Weather> {
    const url = `${WEATHER_API_URL}/current.json?key=${WEATHER_API_KEY}&q=${city}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

// У домашньому завданні getForecastWeather, відеозапис 48:00 та 01:01:22