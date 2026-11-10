import {
  getCurrentWeather,
  getForecastWeather,
} from "@/services/weatherService";
import { Forecast, ForecastDay, Weather } from "@/types/weather";
import { useEffect, useState } from "react";

import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import CurrentWeather from "@/components/CurrentWeather";
import ForecastWeather from "@/components/ForecastWeather";
import SearchBar from "@/components/SearchBar";
import WeatherDetails, {
  WeatherDetailsData,
} from "@/components/WeatherDetails";

export default function Index() {
  // Data:
  const [city, setCity] = useState<string>("Odesa");
  const [weather, setWeather] = useState<Weather | null>(null);
  const [forecast, setForecast] = useState<Forecast | null>(null);
  const [details, setDetails] = useState<WeatherDetailsData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

function openTodayDetails() {
  if (!weather) return;

  const today = forecast?.forecast.forecastday[0];

  setDetails({
    title: "Деталі · сьогодні",
    city: weather.location.name,
    date: today?.date,
    temp_c: weather.current.temp_c,
    feelslike_c: weather.current.feelslike_c,
    condition: weather.current.condition,
    humidity: weather.current.humidity,
    wind_kph: weather.current.wind_kph,
    wind_dir: weather.current.wind_dir,
    pressure_mb: weather.current.pressure_mb,
    vis_km: weather.current.vis_km,
    uv: weather.current.uv,
    cloud: weather.current.cloud,
    mintemp_c: today?.day.mintemp_c,
    maxtemp_c: today?.day.maxtemp_c,
    avgtemp_c: today?.day.avgtemp_c,
    daily_chance_of_rain: today?.day.daily_chance_of_rain,
    totalprecip_mm: today?.day.totalprecip_mm,
    maxwind_kph: today?.day.maxwind_kph,
    sunrise: today?.astro.sunrise,
    sunset: today?.astro.sunset,
    last_updated: weather.current.last_updated,
  });
}

function openDayDetails(day: ForecastDay, index: number) {
  const title =
    index === 0
      ? "Деталі · сьогодні"
      : index === 1
        ? "Деталі · завтра"
        : "Деталі · післязавтра";

  setDetails({
    title,
    city: forecast?.location.name,
    date: day.date,
    temp_c: day.day.avgtemp_c,
    mintemp_c: day.day.mintemp_c,
    maxtemp_c: day.day.maxtemp_c,
    avgtemp_c: day.day.avgtemp_c,
    condition: day.day.condition,
    humidity: day.day.avghumidity,
    maxwind_kph: day.day.maxwind_kph,
    uv: day.day.uv,
    daily_chance_of_rain: day.day.daily_chance_of_rain,
    totalprecip_mm: day.day.totalprecip_mm,
    sunrise: day.astro.sunrise,
    sunset: day.astro.sunset,
  });
}

  // loadWeather():
  async function loadWeather(cityName: string) {
    // 1
    if (!cityName.trim()) {
      setError("Ви не ввели назву міста");
      return;
    }

    // 2
    try {
      setLoading(true);
      setError(null);
      setDetails(null);

      const result = await getCurrentWeather(cityName);
      console.log(result);
      setWeather(result);

      const forecastResult = await getForecastWeather(cityName);
      console.log(forecastResult);
      setForecast(forecastResult);
    } catch (err: any) {
      // 3
      setWeather(null);
      setForecast(null);
      setDetails(null);
      setError("Помилка завантаження погоди: " + err.message);
    } finally {
      // 4
      setLoading(false);
    }
  }

  // OnStart
  useEffect(() => {
    loadWeather(city);
  }, []);

  // GUI:
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>Weather-Info</Text>
        <Text style={styles.subtitle}>WeatherAPI.com</Text>
      </View>

      <SearchBar
        city={city}
        onSearch={() => loadWeather(city)}
        onChangeText={setCity}
      />
      {loading && (
        <View style={styles.loading}>
          <ActivityIndicator size="large" />
          <Text style={styles.loadingText}>Отримання даних про погоду...</Text>
        </View>
      )}
      {error && !loading && (
        <View style={styles.error}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}
      {weather && !loading && (
        <View>
          <CurrentWeather weather={weather} onPress={openTodayDetails} />
        </View>
      )}
      {forecast && !loading && (
        <View>
          <ForecastWeather
            forecast={forecast}
            onDayPress={openDayDetails}
          />
        </View>
      )}
      {details && !loading && (
        <WeatherDetails data={details} onClose={() => setDetails(null)} />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eef6ff",
  },

  content: {
    width: "100%",
    maxWidth: 900,
    alignSelf: "center",
    padding: 20,
    paddingBottom: 50,
  },

  header: {
    marginBottom: 20,
  },

  title: {
    fontSize: 32,
    fontWeight: "500",
    color: "purple",
    textAlign: "center",
  },

  subtitle: {
    fontSize: 16,
    color: "navy",
    marginTop: 4,
    textAlign: "center",
  },

  loading: {
    alignItems: "center",
    padding: 40,
  },

  loadingText: {
    marginTop: 12,
    color: "#555",
  },

  error: {
    backgroundColor: "#fee2e2",
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
  },

  errorText: {
    color: "#991b1b",
    fontSize: 16,
  },

  retry: {
    marginTop: 15,
    backgroundColor: "#dc2626",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },

  retryText: {
    color: "#fff",
    fontWeight: "600",
  },

  sectionTitle: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 15,
  },
});