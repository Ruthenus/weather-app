import { Forecast, ForecastDay } from "@/types/weather";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

interface ForecastWeatherProps {
  forecast: Forecast;
  onDayPress?: (day: ForecastDay, index: number) => void;
}

export default function ForecastWeather(props: ForecastWeatherProps) {
  // 1
  const { forecast, onDayPress } = props;
  const days = forecast.forecast.forecastday.slice(0, 3);
  //
  return (
    <View style={styles.card}>
      <View style={styles.location}>
        <Text
          style={[
            styles.title,
            {
              color: "teal",
            },
          ]}
        >
          Прогноз на 3 дні
        </Text>
        <Text
          style={[
            styles.city,
            {
              color: "teal",
            },
          ]}
        >
          {forecast.location.name}
        </Text>
      </View>
      {days.map((item, index) => {
        const icon = `https:${item.day.condition.icon}`;
        const dayLabel =
          index === 0
            ? "Сьогодні"
            : index === 1
              ? "Завтра"
              : "Післязавтра";

        return (
          <Pressable
            key={item.date}
            onPress={() => onDayPress?.(item, index)}
          >
            <View style={styles.day}>
              <View style={styles.dateRow}>
                <Text style={styles.date}>
                  {dayLabel} · {item.date}
                </Text>
                <Text style={styles.astro}>
                  🌅 {item.astro.sunrise} · 🌇 {item.astro.sunset}
                </Text>
              </View>
              <View style={styles.main}>
                <Image source={{ uri: icon }} style={styles.icon} />
                <View>
                  <Text style={[styles.temperature, { color: "red" }]}>
                    {Math.round(item.day.avgtemp_c)}&deg;C
                  </Text>
                  <Text style={styles.condition}>
                    {item.day.condition.text}
                  </Text>
                  <Text style={styles.minMax}>
                    мін. {Math.round(item.day.mintemp_c)}&deg;C · макс.{" "}
                    {Math.round(item.day.maxtemp_c)}&deg;C
                  </Text>
                </View>
              </View>
              <Text style={styles.hint}>Натисніть для деталей</Text>
            </View>
          </Pressable>
        );
      })}
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
    marginBottom: 8,
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 4,
  },

  city: {
    fontSize: 20,
    fontWeight: "700",
  },

  day: {
    borderTopWidth: 1,
    borderTopColor: "#eee",
    marginTop: 12,
    paddingTop: 12,
  },

  dateRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 6,
  },

  date: {
    color: "gray",
    fontSize: 15,
  },

  astro: {
    color: "navy",
    fontSize: 13,
  },

  main: {
    flexDirection: "row",
    alignItems: "center",
  },

  icon: {
    width: 64,
    height: 64,
    marginRight: 15,
  },

  temperature: {
    fontSize: 32,
    fontWeight: "700",
  },

  condition: {
    fontSize: 16,
    color: "#555",
  },

  minMax: {
    fontSize: 14,
    color: "#888",
    marginTop: 2,
  },

  hint: {
    marginTop: 6,
    fontSize: 12,
    color: "#2563eb",
  },
});
