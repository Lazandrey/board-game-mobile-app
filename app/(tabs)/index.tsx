import {
  Image,
  StyleSheet,
  Platform,
  View,
  Text,
  FlatList,
  RefreshControl,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { useEffect, useState } from "react";

import { useGlobalContext } from "@/context/GlobalProvider";
import { useFetch } from "@/hooks/useFetch";
import { GetEvents } from "@/utils/fetches";

import EventCard from "@/components/EventCard";

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

    try {
      await refetch();
    } catch (error) {
      console.error("Error refreshing data:", error);
    } finally {
      setRefreshing(false);
    }
  };
  useEffect(() => {
    console.log("GlobalContex", GlobalContex);
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
});
