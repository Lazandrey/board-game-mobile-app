import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import { CustomDarkTheme } from "../app/_layout";
import { Picker } from "@react-native-picker/picker";
import { SortGameFileds } from "@/types/game.types";

type GameSearchBarProps = {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedSorting: SortGameFileds;
  setSelectedSorting: (sort: SortGameFileds) => void;
};

const GameSearchBar: React.FC<GameSearchBarProps> = ({
  searchQuery,
  setSearchQuery,
  selectedSorting,
  setSelectedSorting,
}) => {
  const { colors } = useTheme();
  const [showDropDown, setShowDropDown] = useState(false);
  const onSearch = (query: string) => {
    setSearchQuery(query);
    console.log(query);
  };
  let query = "";
  return (
    <View style={styles.searchSectionWrapper}>
      <View style={styles.searchBarWrapper}>
        <Ionicons name="search" size={26} color={colors.text} />
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
      {/* <TouchableOpacity style={styles.fiterBtn}> */}
      <Picker
        style={styles.sortingPicker}
        itemStyle={styles.selectedItem}
        selectedValue={selectedSorting}
        onValueChange={(itemValue) => setSelectedSorting(itemValue)}
      >
        <Picker.Item label="Rating" value="rating" />

        <Picker.Item label="Users rated" value="usersrated" />
        <Picker.Item label="Min players" value="minPlayers" />
        <Picker.Item label="Max players" value="maxPlayers" />
        <Picker.Item label="Min play time" value="minPlayTime" />
        <Picker.Item label="Max play time" value="maxPlayTime" />
        <Picker.Item label="Difficalty" value="weight" />
        <Picker.Item label="Age" value="age" />
      </Picker>
      {/* </TouchableOpacity> */}
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
    height: 60,
  },
  searchInput: {
    color: CustomDarkTheme.colors.text,

    fontSize: 20,
  },
  fiterBtn: {
    backgroundColor: CustomDarkTheme.colors.card,
    padding: 10,
    borderRadius: 4,
  },
  sortingPicker: {
    width: 140,
    height: 60,
    backgroundColor: CustomDarkTheme.colors.card,
    color: CustomDarkTheme.colors.text,
    borderRadius: 4,
    fontSize: 20,
  },
  selectedItem: {
    color: CustomDarkTheme.colors.primary,
  },
});
