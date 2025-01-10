import { StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";
import HeaderImage from "@/components/HeaderImage";
import { GetGameById } from "@/utils/fetches";
import { useFetch } from "@/hooks/useFetch";
import GameDetails from "@/components/GameDetails";
import { GameType } from "@/types/game.types";

const Game = () => {
  const { id } = useLocalSearchParams();
  console.log(id);
  let game: GameType = {} as GameType;
  const { data, loading, refetch } = useFetch(() => GetGameById(id as string));
  if (data) {
    game = data[0];
  }
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <HeaderImage />
        <GameDetails {...game} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Game;

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    display: "flex",
    flexDirection: "column",
    flex: 1,
  },
});
