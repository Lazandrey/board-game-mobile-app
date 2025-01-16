import { StyleSheet, Text, View, ViewProps } from "react-native";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import ThemedText from "./ThemedText";
import { CustomDarkTheme } from "../app/_layout";

type NumericInputProps = ViewProps & {
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  iconSize?: number;
  fontSize?: number;
};
const NumericInput = ({
  value,
  onChange,
  min,
  max,
  iconSize,
  fontSize,
  ...props
}: NumericInputProps) => {
  const increment = () => {
    if (value < max) {
      onChange(value + 1);
    }
  };
  const decrement = () => {
    if (value > min) {
      onChange(value - 1);
    }
  };
  return (
    <View style={styles.container} {...props}>
      <View style={styles.bars}>
        <AntDesign
          name="minus"
          size={iconSize}
          color={CustomDarkTheme.colors.text}
          onPress={decrement}
        />
      </View>
      <View style={styles.bars}>
        <ThemedText style={{ fontSize: fontSize }}>{value}</ThemedText>
      </View>
      <View style={styles.bars}>
        <AntDesign
          name="plus"
          size={iconSize}
          color={CustomDarkTheme.colors.text}
          onPress={increment}
        />
      </View>
    </View>
  );
};

export default NumericInput;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  bars: {
    height: 40,
    width: 30,
    borderRadius: 10,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: CustomDarkTheme.colors.border,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
