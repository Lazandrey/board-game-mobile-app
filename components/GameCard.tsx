import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { GameType } from "@/types/game.types";
import ThemedText from "./ThemedText";
import { useTheme } from "@react-navigation/native";
import { router } from "expo-router";

type GameCardProps = {
  game: GameType;

  onPress: () => void;
};
const GameCard = ({ game, onPress }: GameCardProps) => {
  const { colors } = useTheme();
  return (
    <TouchableOpacity
      onPress={() => {
        onPress();
      }}
    >
      <View style={{ ...styles.container, backgroundColor: colors.card }}>
        <ThemedText style={styles.titleText}>{game.title}</ThemedText>
        <View style={styles.gamaDatawrapper}>
          <Image style={styles.gameImage} source={{ uri: game.gameImageUrl }} />
          <View style={styles.gameDataTextWrapper}>
            <ThemedText style={styles.gameDataText}>
              Difficulty: {game.weight.toFixed(2)}
            </ThemedText>
            <ThemedText style={styles.gameDataText}>
              Rating: {game.rating.toFixed(2)}
            </ThemedText>
            <ThemedText style={styles.gameDataText}>
              Rated qty: {game.usersrated}
            </ThemedText>
            <ThemedText style={styles.gameDataText}>
              Players: {game.minPlayers} - {game.maxPlayers}
            </ThemedText>
          </View>
        </View>
        <View style={styles.bottomGameDataWrapper}>
          <ThemedText style={styles.gameDataText}>
            Time: {game.minPlayTime} - {game.maxPlayTime}
          </ThemedText>
          <ThemedText style={styles.gameDataText}>Age: {game.age}</ThemedText>
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
    borderRadius: 10,
    overflow: "hidden",
  },
  titleText: {
    // height: 30,
    width: "100%",
    fontSize: 25,
    textAlign: "center",
    overflow: "hidden",
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
  gameDataTextWrapper: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 5,
  },
  bottomGameDataWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    gap: 5,
  },
  gameDataText: {
    fontSize: 20,
  },
});
