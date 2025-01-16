import {
  FlatList,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect, useState } from "react";
import HeaderImage from "@/components/HeaderImage";
import CustomButton from "@/components/CustomButton";
import { useGlobalContext } from "@/context/GlobalProvider";
import { useFetch } from "@/hooks/useFetch";
import { GetEvents } from "@/utils/fetches";
import EventCard from "@/components/EventCard";
import { router } from "expo-router";

const index = () => {
  const GlobalContex = useGlobalContext();

  const { data, loading, refetch } = useFetch(() =>
    GetEvents({
      gameTitle: "",
      dateTime: new Date(),
      hostId: GlobalContex.userId,
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
    onRefresh();
  }, [GlobalContex]);
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ListHeaderComponent={() => (
          <>
            <HeaderImage />
            <CustomButton
              title="Add new event"
              onPress={() => router.push("/(events)/create")}
            />
          </>
        )}
        contentContainerStyle={{ gap: 20 }}
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <EventCard card={item} />}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    display: "flex",
    flexDirection: "column",
    flex: 1,
    paddingHorizontal: 10,
  },
});
