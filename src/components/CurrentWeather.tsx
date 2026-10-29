import { Weather } from "@/types/weather";
import { View, Text } from "react-native";

interface CurrentWeatherProps {
  weather: Weather;
}

export default function CurrentWeather(props: CurrentWeatherProps) {
  //
  const { weather } = props;
  //
  return (
    <View>
      <Text>CurrentWeather</Text>
    </View>
  );
}
