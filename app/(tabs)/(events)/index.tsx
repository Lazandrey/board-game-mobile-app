import {
  FlatList,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import HeaderImage from "@/components/HeaderImage";
import CustomButton from "@/components/CustomButton";
import { useGlobalContext } from "@/context/GlobalProvider";
import { useFetch } from "@/hooks/useFetch";
import { GetEvents } from "@/utils/fetches";
import EventCard from "@/components/EventCard";

const index = () => {
  const GlobalContex = useGlobalContext();
  console.log(GlobalContex);
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
    console.log(GlobalContex?.userId);
    onRefresh();
  }, [GlobalContex]);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <HeaderImage />
        <CustomButton title="Add new event" onPress={() => {}} />
        <FlatList
          contentContainerStyle={{ gap: 20 }}
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <EventCard card={item} />}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      </View>
    </SafeAreaView>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    display: "flex",
    flexDirection: "column",
  },
  wrapper: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    paddingTop: 10,
    gap: 10,
    display: "flex",
    flexDirection: "column",
    flex: 1,
  },
});
