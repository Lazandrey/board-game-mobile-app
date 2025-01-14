import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import ThemedText from "./ThemedText";
import { CustomDarkTheme } from "@/app/_layout";

type CustomButtonProps = {
  title: string;
  onPress: () => void;
};
const CustomButton = ({ title, onPress }: CustomButtonProps) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <ThemedText style={styles.buttonText}>{title}</ThemedText>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  button: {
    width: "100%",
    height: 60,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: CustomDarkTheme.colors.notification,
    borderRadius: 6,
  },
  buttonText: {
    color: CustomDarkTheme.colors.primary,
    fontSize: 20,
  },
});
