import {
  Image,
  StyleSheet,
  Platform,
  View,
  Text,
  FlatList,
  RefreshControl,
} from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import ThemedText from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { SafeAreaView } from "react-native-safe-area-context";
import { useColorScheme } from "react-native";
import { useEffect, useState } from "react";
import * as Location from "expo-location";
import { useGlobalContext } from "@/context/GlobalProvider";
import { useFetch } from "@/hooks/useFetch";
import { GetEvents } from "@/utils/fetches";
import {
  EventRegisterType,
  GetEventsType,
  GetEventType,
  GetGamesType,
  GetGameType,
  IsUserRegisteredType,
  SaveEventType,
  UpdateEventType,
  EventType,
  GameType,
} from "@/types/game.types";
import EventCard from "@/components/EventCard";
import { useTheme } from "@react-navigation/native";

export default function HomeScreen() {
  const GlobalContex = useGlobalContext();
  const [data, setData] = useState<EventType[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  useEffect(() => {
    const newData = GetEvents({
      gameTitle: "",
      dateTime: new Date(),
      hostId: "",
      isCanceled: false,
      setEvents: () => {},
      setFetchError: () => {},
      userGeolocation: {
        longitude: GlobalContex?.location?.lng || 0,
        latitude: GlobalContex?.location?.lat || 0,
      },
      distance: 50,
    });
    newData.then((res) => setData(res));
  }, [GlobalContex]);

  const onRefresh = async () => {
    setRefreshing(true);
    console.log("refreshing");
    const newData = GetEvents({
      gameTitle: "",
      dateTime: new Date(),
      hostId: "",
      isCanceled: false,
      setEvents: () => {},
      setFetchError: () => {},
      userGeolocation: {
        longitude: GlobalContex?.location?.lng || 0,
        latitude: GlobalContex?.location?.lat || 0,
      },
      distance: 50,
    });
    newData.then((res) => setData(res));
    setRefreshing(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        contentContainerStyle={{ gap: 20 }}
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <EventCard card={item} />}
        ListHeaderComponent={() => (
          <View style={styles.title}>
            <Image
              style={styles.logoImage}
              resizeMode="contain"
              source={require("../../assets/images/logoText.png")}
            />
            <View>
              <Image
                style={styles.topImage}
                resizeMode="cover"
                source={require("../../assets/images/board-game.png")}
              />
            </View>
          </View>
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    display: "flex",
    flexDirection: "column",
  },
  title: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  logoImage: {
    height: 60,
    width: 160,
  },
  topImage: {
    width: "100%",
    height: 160,
  },
  logoText: {
    fontSize: 32,
    fontWeight: "bold",
    fontFamily: "Baloo 2",
  },
});
