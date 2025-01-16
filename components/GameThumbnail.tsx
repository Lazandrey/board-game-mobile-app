import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { GameType } from "@/types/game.types";
import ThemedText from "./ThemedText";

interface GameThumbnailProps {
  game: GameType;
}
const GameThumbnail = ({ game }: GameThumbnailProps) => {
  return (
    <View style={styles.eventGameWrapper}>
      <View>
        <Image style={styles.gameImage} source={{ uri: game.gameImageUrl }} />
      </View>

      <View style={styles.gameTitleWrapper}>
        <ThemedText style={styles.gameTitle}>{game.title}</ThemedText>
      </View>
    </View>
  );
};

export default GameThumbnail;

const styles = StyleSheet.create({
  eventGameWrapper: {
    height: 100,
    display: "flex",
    flexDirection: "row",
    borderStyle: "solid",
    borderWidth: 1,
  },

  gameImage: {
    width: 100,
    height: 100,
    borderRadius: 4,
    marginRight: 8,
    overflow: "hidden",
  },
  gameTitleWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  gameTitle: {
    overflow: "hidden",
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
  },
});
