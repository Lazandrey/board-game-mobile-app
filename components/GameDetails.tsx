import { StyleSheet, Text, View, Image } from "react-native";
import HTMLView from "react-native-htmlview";
import { GameType } from "@/types/game.types";
import ThemedText from "./ThemedText";
import { useRef } from "react";
import { ReactNativeZoomableView } from "@openspacelabs/react-native-zoomable-view";
import { ThemedView } from "./ThemedView";

const GameDetails = (game: GameType) => {
  const richText = useRef(null);
  return (
    <View>
      <ReactNativeZoomableView
        maxZoom={3}
        minZoom={1}
        // contentWidth={300}
        // contentHeight={400}
        style={styles.container}
      >
        <ThemedText style={styles.titleText}>{game.title}</ThemedText>
        <Image source={{ uri: game.gameImageUrl }} style={styles.image} />
        <View style={styles.gameDataWrapper}>
          <ThemedText style={styles.text}>Difficulty: {game.weight}</ThemedText>
          <ThemedText style={styles.text}>Raiting: {game.rating}</ThemedText>
          <ThemedText style={styles.text}>
            Rated qty: {game.usersrated}
          </ThemedText>
          <ThemedText style={styles.text}>
            Players: {game.minPlayers} - {game.maxPlayers}
          </ThemedText>
          <ThemedText style={styles.text}>
            Time: {game.minPlayTime} - {game.maxPlayTime}
          </ThemedText>
          <ThemedText style={styles.text}>Age: {game.age}</ThemedText>
        </View>
        <HTMLView value={`<p>${game.description}</p>`} stylesheet={styles} />
      </ReactNativeZoomableView>
    </View>
  );
};

export default GameDetails;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    paddingHorizontal: 10,
    paddingBottom: 10,
    borderRadius: 4,
    overflow: "hidden",
  },
  gameDataWrapper: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    gap: 5,
  },
  titleText: {
    width: "100%",
    fontSize: 20,
    textAlign: "center",
  },
  image: {
    height: 250,
    width: "100%",
    objectFit: "contain",
  },
  p: {
    color: "white",
    fontSize: 18,
  },
  text: {
    fontSize: 18,
  },
});
