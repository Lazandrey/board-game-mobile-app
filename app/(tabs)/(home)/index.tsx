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
import HeaderImage from "@/components/HeaderImage";
import Header from "@/components/Header";

export default function HomeScreen() {
  const GlobalContex = useGlobalContext();

  const { data, loading, refetch } = useFetch(() =>
    GetEvents({
      gameTitle: "",
      dateTime: new Date(),
      hostId: "",
      isCanceled: false,
      userGeolocation: {
        longitude: GlobalContex?.location?.lng || 0,
        latitude: GlobalContex?.location?.lat || 0,
      },
      distance: GlobalContex?.searchDistanceKm || 50,
    })
  );

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    console.log("Refreshing data...");

    try {
      await refetch(); // Call the refetch function
    } catch (error) {
      console.error("Error refreshing data:", error);
    } finally {
      setRefreshing(false);
    }
  };
  useEffect(() => {
    onRefresh();
  }, [GlobalContex]);
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        contentContainerStyle={{ gap: 20 }}
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <EventCard card={item} />}
        ListHeaderComponent={() => <Header />}
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
    flex: 1,
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
