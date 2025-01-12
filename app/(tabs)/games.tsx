import {
  View,
  Text,
  FlatList,
  StyleSheet,
  RefreshControl,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGlobalContext } from "@/context/GlobalProvider";
import { useFetch } from "@/hooks/useFetch";
import { GetEvents, GetGames } from "@/utils/fetches";
import EventCard from "@/components/EventCard";
import GameCard from "@/components/GameCard";
import HeaderImage from "@/components/HeaderImage";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import GameSearchBar from "@/components/GameSearchBar";
import { CustomDarkTheme } from "..//_layout";

const games = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [onPage, setOnPage] = useState(30);
  const GlobalContex = useGlobalContext();
  const { data, loading, refetch } = useFetch(() =>
    GetGames({
      title: searchQuery,
      sortField: null,
      startIndex: (page - 1) * onPage,
      offset: onPage,
    })
  );
  const [searchQuery, setSearchQuery] = useState("");

  const { colors } = useTheme();

  const Refresh = async () => {
    setRefreshing(true);
    console.log("Refreshing data...");

    try {
      await refetch(); // Call the refetch function
    } catch (error) {
      console.error("Error refreshing data:", error);
    } finally {
      setRefreshing(false);
    }
  };

  const onRefresh = async () => {
    setPage(1);
  };

  const onEndReached = () => {
    setPage(page + 1);
    console.log("page", page);
  };

  useEffect(() => {
    if (page > 1) {
      Refresh();
    } else {
      if (data) {
        data.length = 0;
        Refresh();
      }
    }
  }, [page]);

  useEffect(() => {
    if (data) {
      data.length = 0;
      Refresh();
    }
  }, [searchQuery]);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        contentContainerStyle={{ gap: 20 }}
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <GameCard game={item} />}
        ListHeaderComponent={() => (
          <View style={styles.title}>
            <HeaderImage />
            <View>
              <Image
                style={styles.topImage}
                resizeMode="cover"
                source={require("../../assets/images/board-game.png")}
              />
            </View>
            <GameSearchBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          </View>
        )}
        onEndReachedThreshold={0.3}
        onEndReached={onEndReached}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default games;

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    display: "flex",
    flexDirection: "column",
    flex: 1,
  },
  title: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  logoImage: {
    height: 60,
    width: 160,
  },
  topImage: {
    width: "100%",
    height: 160,
  },
  logoText: {
    fontSize: 32,
    fontWeight: "bold",
    fontFamily: "Baloo 2",
  },
  searchSectionWrapper: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  searchBarWrapper: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: CustomDarkTheme.colors.card,
    borderRadius: 4,
  },
  searchInput: {
    flex: 1,
    color: CustomDarkTheme.colors.text,
    fontSize: 16,
  },
  fiterBtn: {
    backgroundColor: CustomDarkTheme.colors.card,
    padding: 10,
    borderRadius: 4,
  },
});
