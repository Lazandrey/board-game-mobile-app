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
import Header from "@/components/Header";
import { SortGameFileds, GameType } from "@/types/game.types";
import { router } from "expo-router";

const games = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [onPage, setOnPage] = useState(5);
  const GlobalContex = useGlobalContext();
  const { data, loading, refetch } = useFetch(() =>
    GetGames({
      title: searchQuery,
      sortField: selectedSorting,
      startIndex: (page - 1) * onPage,
      offset: onPage,
    })
  );

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSorting, setSelectedSorting] =
    useState<SortGameFileds>("rating");
  const { colors } = useTheme();

  const [showsData, setShowsData] = useState<GameType[]>([]);

  const Refresh = async () => {
    setRefreshing(true);

    try {
      await refetch(); // Call the refetch function
    } catch (error) {
      console.error("Error refreshing data:", error);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    if (data) {
      if (page < 3) {
        setShowsData([]);
      }
      setShowsData((prevShowsData) => [...prevShowsData, ...data]);
    }
  }, [data]);

  const onRefresh = async () => {
    setPage(1);
  };

  const onEndReached = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    Refresh();
  }, [page]);

  useEffect(() => {
    setPage(1);
    Refresh();
  }, [searchQuery, selectedSorting]);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        contentContainerStyle={{ gap: 20 }}
        data={showsData}
        keyExtractor={(game) => game.id}
        renderItem={({ item }) => (
          <GameCard
            game={item}
            onPress={() => {
              router.push({
                pathname: "/(games)/[id]",
                params: { id: item.id },
              });
            }}
          />
        )}
        ListHeaderComponent={() => (
          <View style={styles.title}>
            <Header />
            <GameSearchBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedSorting={selectedSorting}
              setSelectedSorting={setSelectedSorting}
            />
          </View>
        )}
        onEndReachedThreshold={0.8}
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
    paddingHorizontal: 10,
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
