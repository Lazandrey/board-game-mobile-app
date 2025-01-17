import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect, useState } from "react";
import { router, Stack, useLocalSearchParams } from "expo-router";
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
  const [pageTitle, setPageTitle] = useState(" ");
  const { data, loading, refetch } = useFetch(() => GetEventById(id as string));

  if (data) {
    event = data[0];
  }
  useEffect(() => {
    if (event.id && event.host.id === GlobalContext?.userId) {
      setIsHost(true);
    }
    if (event?.game?.title) {
      setPageTitle(event.game.title);
    }
  }, [GlobalContext, event, pageTitle]);
  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: pageTitle,
          headerTitleAlign: "center",
        }}
      />
      <ScrollView contentContainerStyle={styles.wrapper}>
        <HeaderImage />
        {isHost && (
          <CustomButton
            title="Update Event"
            onPress={() => router.push(`/(events)/update/${id}`)}
          />
        )}
        {event.id && <EventDetails {...event} />}
      </ScrollView>
    </View>
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
