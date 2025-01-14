import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import HeaderImage from "@/components/HeaderImage";
import CustomButton from "@/components/CustomButton";
import EventDetails from "@/components/EventDetails";
import { EventType } from "@/types/game.types";
import { useFetch } from "@/hooks/useFetch";
import { GetEventById } from "@/utils/fetches";
import { useGlobalContext } from "@/context/GlobalProvider";

const Event = () => {
  const { id } = useLocalSearchParams();
  const GlobalContext = useGlobalContext();
  const [isHost, setIsHost] = useState(false);
  let event: EventType = {} as EventType;
  const { data, loading, refetch } = useFetch(() => GetEventById(id as string));

  if (data) {
    event = data[0];
  }
  useEffect(() => {
    if (event.id && event.host.id === GlobalContext?.userId) {
      setIsHost(true);
    }
  }, [GlobalContext, event]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.wrapper}>
        <HeaderImage />
        {isHost && (
          <CustomButton
            title="Update Event"
            onPress={() => router.push(`/events/update/${id}`)}
          />
        )}
        {event.id && <EventDetails {...event} />}
        {/* <CustomButton title="Return" onPress={() => router.push("/games")} /> */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Event;

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

    display: "flex",
    flexDirection: "column",
  },
});
