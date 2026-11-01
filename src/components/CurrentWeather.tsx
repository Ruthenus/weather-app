import { Weather } from "@/types/weather";
import { Image, StyleSheet, Text, View } from "react-native";

interface CurrentWeatherProps {
  weather: Weather;
}

export default function CurrentWeather(props: CurrentWeatherProps) {
  // 1
  const { weather } = props;
  const icon = `https:${weather.current.condition.icon}`;
  //
  return (
    <View style={styles.card}>
      <View style={styles.location}>
        <Text style={[styles.city, { color: "teal" }]}>
          {weather.location.name}
        </Text>
        <Text
          style={[
            styles.country,
            {
              color: "gray",
              fontSize: 18,
              fontWeight: 700,
            },
          ]}
        >
          {weather.location.country}
        </Text>
      </View>
      <View style={styles.main}>
        <Image source={{ uri: icon }} style={styles.icon} />
        <View>
          <Text
            style={[
              styles.temperature,
              {
                color: "red",
                fontWeight: 500,
              },
            ]}
          >
            {Math.round(weather.current.temp_c)}&deg;C
          </Text>
          <Text style={styles.condition}>{weather.current.condition.text}</Text>
        </View>
      </View>
      <Text
        style={[
          styles.updated,
          {
            color: "navy",
            fontSize: 18,
            fontWeight: 500,
          },
        ]}
      >
        Оновлено: {weather.current.last_updated}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 24,
    marginBottom: 16,

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
  },

  location: {
    marginBottom: 15,
  },

  city: {
    fontSize: 28,
    fontWeight: "700",
  },

  country: {
    color: "#665",
    fontSize: 15,
    marginTop: 4,
  },

  main: {
    flexDirection: "row",
    alignItems: "center",
  },

  icon: {
    width: 90,
    height: 90,
    marginRight: 15,
  },

  temperature: {
    fontSize: 52,
    fontWeight: "700",
  },

  condition: {
    fontSize: 18,
    color: "#555",
  },

  updated: {
    marginTop: 15,
    color: "#888",
  },
});
