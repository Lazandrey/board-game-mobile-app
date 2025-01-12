import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import { CustomDarkTheme } from "../app/_layout";

type GameSearchBarProps = {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
};

const GameSearchBar: React.FC<GameSearchBarProps> = ({
  searchQuery,
  setSearchQuery,
}) => {
  const { colors } = useTheme();
  const onSearch = (query: string) => {
    setSearchQuery(query);
    console.log(query);
  };
  let query = "";
  return (
    <View style={styles.searchSectionWrapper}>
      <View style={styles.searchBarWrapper}>
        <Ionicons name="search" size={24} color={colors.text} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          defaultValue={searchQuery}
          onChangeText={(q) => (query = q)}
          onBlur={() => onSearch(query)}
          placeholderTextColor={colors.text}
          clearButtonMode="always"
        />
      </View>
      <TouchableOpacity style={styles.fiterBtn}>
        <Ionicons name="options" size={28} color={colors.text} />
      </TouchableOpacity>
    </View>
  );
};

export default GameSearchBar;

const styles = StyleSheet.create({
  searchSectionWrapper: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 10,

    paddingVertical: 20,
    paddingBottom: 0,
  },
  searchBarWrapper: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 10,
    // paddingVertical: 10,
    backgroundColor: CustomDarkTheme.colors.card,
    borderRadius: 4,
  },
  searchInput: {
    color: CustomDarkTheme.colors.text,

    fontSize: 16,
  },
  fiterBtn: {
    backgroundColor: CustomDarkTheme.colors.card,
    padding: 10,
    borderRadius: 4,
  },
});
