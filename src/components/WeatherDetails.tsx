import { Condition } from "@/types/weather";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

export interface WeatherDetailsData {
  title: string;
  date?: string;
  city?: string;
  temp_c?: number;
  feelslike_c?: number;
  mintemp_c?: number;
  maxtemp_c?: number;
  avgtemp_c?: number;
  condition?: Condition;
  humidity?: number;
  wind_kph?: number;
  wind_dir?: string;
  pressure_mb?: number;
  vis_km?: number;
  uv?: number;
  cloud?: number;
  daily_chance_of_rain?: number;
  maxwind_kph?: number;
  totalprecip_mm?: number;
  sunrise?: string;
  sunset?: string;
  last_updated?: string;
}

interface WeatherDetailsProps {
  data: WeatherDetailsData;
  onClose: () => void;
}

export default function WeatherDetails(props: WeatherDetailsProps) {
  const { data, onClose } = props;
  const icon = data.condition?.icon
    ? `https:${data.condition.icon}`
    : undefined;

  const rows: { label: string; value: string }[] = [];

  if (data.feelslike_c != null) {
    rows.push({
      label: "Відчувається як",
      value: `${Math.round(data.feelslike_c)}°C`,
    });
  }
  if (data.mintemp_c != null && data.maxtemp_c != null) {
    rows.push({
      label: "Мін / макс",
      value: `${Math.round(data.mintemp_c)}°C / ${Math.round(data.maxtemp_c)}°C`,
    });
  }
  if (data.avgtemp_c != null) {
    rows.push({
      label: "Середня",
      value: `${Math.round(data.avgtemp_c)}°C`,
    });
  }
  if (data.humidity != null) {
    rows.push({ label: "Вологість", value: `${data.humidity}%` });
  }
  if (data.wind_kph != null) {
    rows.push({
      label: "Вітер",
      value: `${Math.round(data.wind_kph)} км/год ${data.wind_dir ?? ""}`.trim(),
    });
  }
  if (data.maxwind_kph != null) {
    rows.push({
      label: "Макс. вітер",
      value: `${Math.round(data.maxwind_kph)} км/год`,
    });
  }
  if (data.pressure_mb != null) {
    rows.push({
      label: "Тиск",
      value: `${Math.round(data.pressure_mb)} мбар`,
    });
  }
  if (data.vis_km != null) {
    rows.push({ label: "Видимість", value: `${data.vis_km} км` });
  }
  if (data.cloud != null) {
    rows.push({ label: "Хмарність", value: `${data.cloud}%` });
  }
  if (data.uv != null) {
    rows.push({ label: "UV-індекс", value: String(data.uv) });
  }
  if (data.daily_chance_of_rain != null) {
    rows.push({
      label: "Ймовірність дощу",
      value: `${data.daily_chance_of_rain}%`,
    });
  }
  if (data.totalprecip_mm != null) {
    rows.push({
      label: "Опади",
      value: `${data.totalprecip_mm} мм`,
    });
  }
  if (data.sunrise && data.sunset) {
    rows.push({
      label: "Схід / захід",
      value: `${data.sunrise} · ${data.sunset}`,
    });
  }
  if (data.last_updated) {
    rows.push({ label: "Оновлено", value: data.last_updated });
  }

  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <Text style={[styles.title, { color: "teal" }]}>{data.title}</Text>
        <Pressable onPress={onClose} hitSlop={8}>
          <Text style={styles.close}>Закрити</Text>
        </Pressable>
      </View>

      {!!data.city && <Text style={styles.city}>{data.city}</Text>}
      {!!data.date && <Text style={styles.date}>{data.date}</Text>}

      <View style={styles.main}>
        {icon ? (
          <Image source={{ uri: icon }} style={styles.icon} />
        ) : null}
        <View>
          {data.temp_c != null && (
            <Text style={[styles.temperature, { color: "red" }]}>
              {Math.round(data.temp_c)}&deg;C
            </Text>
          )}
          {!!data.condition?.text && (
            <Text style={styles.condition}>{data.condition.text}</Text>
          )}
        </View>
      </View>

      <View style={styles.grid}>
        {rows.map((row) => (
          <View key={row.label} style={styles.item}>
            <Text style={styles.label}>{row.label}</Text>
            <Text style={styles.value}>{row.value}</Text>
          </View>
        ))}
      </View>
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
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
  },
  close: {
    color: "#2563eb",
    fontSize: 15,
    fontWeight: "600",
  },
  city: {
    fontSize: 18,
    fontWeight: "700",
    color: "teal",
    marginTop: 4,
  },
  date: {
    color: "gray",
    fontSize: 14,
    marginTop: 2,
    marginBottom: 8,
  },
  main: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  icon: {
    width: 72,
    height: 72,
    marginRight: 12,
  },
  temperature: {
    fontSize: 40,
    fontWeight: "700",
  },
  condition: {
    fontSize: 16,
    color: "#555",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  item: {
    width: "47%",
    backgroundColor: "#f8fbff",
    borderRadius: 12,
    padding: 12,
  },
  label: {
    fontSize: 12,
    color: "#64748b",
    marginBottom: 4,
  },
  value: {
    fontSize: 15,
    fontWeight: "600",
    color: "#1e293b",
  },
});