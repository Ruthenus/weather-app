import { getCurrentWeather } from "@/services/weatherService";
import { useState, useEffect } from "react";
import { Weather } from "@/types/weather";

import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  Pressable,
  ScrollView,
} from "react-native";

import CurrentWeather from "@/components/CurrentWeather";
import ForecastWeather from "@/components/ForecastWeather";
import SearchBar from "@/components/SearchBar";
import WeatherDetails from "@/components/WeatherDetails";

export default function Index() {
  // Data:
  const [city, setCity] = useState<string>("Odesa");
  const [weather, setWeather] = useState<Weather | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

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
      const result = await getCurrentWeather(cityName);
      // console.log(result);
      setWeather(result);
    } catch (err: any) {
      // 3
      setWeather(null);
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
      {weather && !loading && (
        <View>
          <CurrentWeather weather={weather} />
        </View>
      )}

      <WeatherDetails />
      <ForecastWeather />
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

// Домашнє завдання ForecastWeather 01:13:00, 01:13:31
