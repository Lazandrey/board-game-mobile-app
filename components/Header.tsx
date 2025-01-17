import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import HeaderImage from "./HeaderImage";

// import {boardGame} from "../assets/images/board-game.png"

const Header = () => {
  return (
    <View style={styles.title}>
      <HeaderImage />
      <View>
        <Image
          style={styles.topImage}
          resizeMode="cover"
          source={require("../assets/images/board-game.png")}
        />
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  title: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
  },

  topImage: {
    width: "100%",
    height: 160,
    borderRadius: 10,
  },
});
