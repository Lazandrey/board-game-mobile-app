import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { GameType } from "@/types/game.types";
import ThemedText from "./ThemedText";
import { useTheme } from "@react-navigation/native";
import { router } from "expo-router";

type GameCardProps = {
  game: GameType;
};
const GameCard = ({ game }: GameCardProps) => {
  const { colors } = useTheme();
  return (
    <TouchableOpacity
      onPress={() => {
        // console.log(`/games/${game.id}`);
        router.push({
          pathname: "/games/[id]",
          params: { id: game.id },
        });
      }}
    >
      <View style={{ ...styles.container, backgroundColor: colors.card }}>
        <ThemedText style={styles.titleText}>{game.title}</ThemedText>
        <View style={styles.gamaDatawrapper}>
          <Image style={styles.gameImage} source={{ uri: game.gameImageUrl }} />
          <View style={styles.gameGataTextWrapper}>
            <ThemedText>Difficulty: {game.weight}</ThemedText>
            <ThemedText>Rating: {game.rating}</ThemedText>
            <ThemedText>Rated qty: {game.usersrated}</ThemedText>
            <ThemedText>
              Players: {game.minPlayers} - {game.maxPlayers}
            </ThemedText>
            <ThemedText>
              Time: {game.minPlayTime} - {game.maxPlayTime}
            </ThemedText>
            <ThemedText>Age: {game.age}</ThemedText>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default GameCard;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: 10,
    paddingHorizontal: 10,
    paddingBottom: 10,
    borderRadius: 4,
    overflow: "hidden",
  },
  titleText: {
    height: 30,
    width: "100%",
    fontSize: 20,
    textAlign: "center",
  },
  gameImage: {
    width: 200,
    height: 200,
    borderRadius: 4,
    marginRight: 8,
    overflow: "hidden",
  },
  gamaDatawrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  gameGataTextWrapper: {
    width: "100%",
    display: "flex",
    flexDirection: "column",

    alignItems: "flex-start",
    gap: 5,
  },
});
