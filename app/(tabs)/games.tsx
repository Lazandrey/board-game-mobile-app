import {
  View,
  Text,
  FlatList,
  StyleSheet,
  RefreshControl,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGlobalContext } from "@/context/GlobalProvider";
import { useFetch } from "@/hooks/useFetch";
import { GetEvents, GetGames } from "@/utils/fetches";
import EventCard from "@/components/EventCard";
import GameCard from "@/components/GameCard";

const games = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [onPage, setOnPage] = useState(30);
  const GlobalContex = useGlobalContext();
  const { data, loading, refetch } = useFetch(() =>
    GetGames({
      title: "",
      sortField: null,
      startIndex: (page - 1) * onPage,
      offset: onPage,
    })
  );

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

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        contentContainerStyle={{ gap: 20 }}
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <GameCard game={item} />}
        ListHeaderComponent={() => (
          <View style={styles.title}>
            <Image
              style={styles.logoImage}
              resizeMode="contain"
              source={require("../../assets/images/logoText.png")}
            />
            <View>
              <Image
                style={styles.topImage}
                resizeMode="cover"
                source={require("../../assets/images/board-game.png")}
              />
            </View>
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
});
