import { StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, Stack, useLocalSearchParams } from "expo-router";
import HeaderImage from "@/components/HeaderImage";
import { GetGameById } from "@/utils/fetches";
import { useFetch } from "@/hooks/useFetch";
import GameDetails from "@/components/GameDetails";
import { GameType } from "@/types/game.types";
import CustomButton from "@/components/CustomButton";

const Game = () => {
  const { id } = useLocalSearchParams();

  let game: GameType = {} as GameType;
  const { data, loading, refetch } = useFetch(() => GetGameById(id as string));
  if (data) {
    game = data[0];
  }
  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: game.title,
          headerTitleAlign: "center",
        }}
      />
      <ScrollView contentContainerStyle={styles.wrapper}>
        <HeaderImage />
        <GameDetails {...game} />
      </ScrollView>
    </View>
  );
};

export default Game;

const styles = StyleSheet.create({
  container: {
    width: "100%",

    display: "flex",
    flexDirection: "column",
    flex: 1,
  },
  wrapper: {
    paddingHorizontal: 20,

    display: "flex",
    flexDirection: "column",
  },
});
