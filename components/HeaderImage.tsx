import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";

const HeaderImage = () => {
  return (
    <View style={styles.title}>
      <Image
        style={styles.logoImage}
        resizeMode="contain"
        source={require("../assets/images/logo-transtapent.png")}
      />
    </View>
  );
};

export default HeaderImage;

const styles = StyleSheet.create({
  title: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  logoImage: {
    height: 60,
    width: 160,
  },
});
